# =====================================================================
#  Turns Out / Long Lost Cousin: the picture fetcher
#
#  What it does
#    1. reads   r/long-lost-cousin-names.csv   (one row per animal or plant)
#    2. asks PhyloPic (phylopic.org, free silhouettes of living things) for each one
#    3. saves PhyloPic's answers and up to 4 silhouettes each in  r/long-lost-cousin-raw/
#    4. packs that folder into  r/long-lost-cousin-raw.zip
#
#  The raw folder and the zip are working material for Claude: it picks the best
#  silhouette of each animal and reads who drew it and under which licence.
#  Neither is sent to GitHub.
#
#  How to run it
#    Open this file in RStudio and press "Source". It takes about 10 minutes.
#    Running it again is safe: what is already there is skipped.
# =====================================================================

want  <- 4       # silhouettes to keep for each animal or plant
pause <- 0.1     # seconds between two requests, to be polite to PhyloPic

# ---------------------------------------------------------------------
# 0. Tools
# ---------------------------------------------------------------------
say <- function(...) cat(..., "\n", sep = "")

find_root <- function() {
  cands <- c(getwd(), dirname(getwd()))
  of <- tryCatch(sys.frame(1)$ofile, error = function(e) NULL)
  if (!is.null(of)) cands <- c(dirname(dirname(normalizePath(of))), cands)
  if (requireNamespace("rstudioapi", quietly = TRUE) && rstudioapi::isAvailable()) {
    p <- tryCatch(rstudioapi::getActiveDocumentContext()$path, error = function(e) "")
    if (!is.null(p) && nzchar(p)) cands <- c(dirname(dirname(normalizePath(p))), cands)
  }
  for (d in unique(cands)) {
    if (file.exists(file.path(d, "r", "long-lost-cousin-names.csv"))) return(d)
  }
  stop("I cannot find r/long-lost-cousin-names.csv. In RStudio choose Session > Set Working Directory > To Source File Location, then run again.", call. = FALSE)
}

# Copies one web address into a file. Returns TRUE if it worked.
# (TURNSOUT_DOWNLOAD and TURNSOUT_BODY are only used for testing the script without the internet.)
download_one <- if (exists("TURNSOUT_DOWNLOAD", mode = "function")) TURNSOUT_DOWNLOAD else function(url, dest) {
  ok <- tryCatch(
    suppressWarnings(utils::download.file(url, dest, mode = "wb", quiet = TRUE)) == 0,
    error = function(e) FALSE
  )
  isTRUE(ok)
}

# Reads what a web address answers, even when the answer is an error message.
# (R's own download gives up on error messages, and PhyloPic uses one to tell its current "build" number.)
get_body <- if (exists("TURNSOUT_BODY", mode = "function")) TURNSOUT_BODY else function(url) {
  if (requireNamespace("curl", quietly = TRUE)) {
    r <- tryCatch(curl::curl_fetch_memory(url), error = function(e) NULL)
    if (!is.null(r) && length(r$content) > 0) return(rawToChar(r$content))
  }
  out <- tryCatch(suppressWarnings(system2("curl", c("-sS", "-L", "-m", "30", shQuote(url)), stdout = TRUE, stderr = FALSE)),
                  error = function(e) character(0))
  paste(out, collapse = "\n")
}

fetch <- function(url, dest, tries = 3) {
  for (attempt in seq_len(tries)) {
    tmp <- paste0(dest, ".part")
    if (file.exists(tmp)) file.remove(tmp)
    ok <- download_one(url, tmp)
    if (ok && file.exists(tmp) && file.size(tmp) > 0) {
      if (file.exists(dest)) file.remove(dest)
      file.rename(tmp, dest)
      Sys.sleep(pause)
      return(TRUE)
    }
    if (file.exists(tmp)) file.remove(tmp)
    if (attempt < tries) Sys.sleep(attempt)
  }
  FALSE
}

read_text <- function(path) {
  if (!file.exists(path)) return("")
  paste(suppressWarnings(readLines(path, warn = FALSE, encoding = "UTF-8")), collapse = "\n")
}

all_matches <- function(pattern, text) {
  if (!nzchar(text)) return(character(0))
  regmatches(text, gregexpr(pattern, text, perl = TRUE))[[1]]
}

uuid <- "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
api  <- "https://api.phylopic.org"

# PhyloPic wants every request to carry its current "build" number. It tells the number
# in its answers, also in the error message it sends when the number is missing.
build <- ""
find_build <- function() {
  for (address in c(paste0(api, "/"), paste0(api, "/images"), paste0(api, "/nodes"))) {
    tmp <- tempfile()
    text <- if (fetch(address, tmp, tries = 1)) read_text(tmp) else get_body(address)
    if (file.exists(tmp)) file.remove(tmp)
    hit <- all_matches("\"build\"\\s*:\\s*[0-9]+", text)
    if (length(hit) == 0) hit <- all_matches("build=[0-9]+", text)
    if (length(hit) > 0) return(gsub("[^0-9]", "", hit[1]))
  }
  ""
}

# Asks PhyloPic's catalogue one question and saves the answer. If it fails, the build number is looked up again once.
ask <- function(path, query, dest) {
  for (round in 1:2) {
    address <- paste0(api, path, "?build=", build, if (nzchar(query)) paste0("&", query) else "")
    if (fetch(address, dest, tries = if (round == 1) 2 else 1)) return(read_text(dest))
    fresh <- find_build()
    if (!nzchar(fresh) || identical(fresh, build)) break
    build <<- fresh
  }
  ""
}

# PhyloPic wants names in small letters, with letters and spaces only.
plain_name <- function(x) trimws(gsub(" +", " ", gsub("[^a-z ]", " ", tolower(x))))

is_svg <- function(path) {
  if (!file.exists(path) || file.size(path) < 150) return(FALSE)
  grepl("<svg", read_text(path), fixed = TRUE)
}

# ---------------------------------------------------------------------
# 1. Read the list
# ---------------------------------------------------------------------
old_timeout <- options(timeout = 120)
root <- find_root()
list_file <- file.path(root, "r", "long-lost-cousin-names.csv")
things <- utils::read.csv(list_file, stringsAsFactors = FALSE)
if (!all(c("key", "label", "names") %in% names(things))) stop("r/long-lost-cousin-names.csv must have the columns: key, label, names.", call. = FALSE)
things <- things[nzchar(things$key) & nzchar(things$names), , drop = FALSE]
if (any(!grepl("^[a-z_]+$", things$key))) stop("A key in r/long-lost-cousin-names.csv has other signs than small letters and _. Nothing was changed.", call. = FALSE)

raw <- file.path(root, "r", "long-lost-cousin-raw")
dir.create(raw, recursive = TRUE, showWarnings = FALSE)
found_file <- file.path(raw, "found.csv")
found <- data.frame(key = character(0), label = character(0), n = integer(0), image = character(0),
                    asked = character(0), file = character(0), stringsAsFactors = FALSE)
if (file.exists(found_file)) {
  earlier <- tryCatch(utils::read.csv(found_file, stringsAsFactors = FALSE), error = function(e) NULL)
  if (!is.null(earlier) && all(names(found) %in% names(earlier)) && nrow(earlier) > 0) {
    earlier <- earlier[file.exists(file.path(raw, earlier$file)), names(found), drop = FALSE]
    found <- rbind(found, earlier)
  }
}

total <- nrow(things)
say("Long Lost Cousin: ", total, " animals and plants on the list.")

build <- find_build()
if (!nzchar(build)) {
  say("PhyloPic did not tell its build number, so nothing can be fetched.")
  say("Its answer began: ", substr(get_body(paste0(api, "/images")), 1, 300))
  say("Copy these lines into the chat with Claude.")
  options(old_timeout)
  stop("Stopped. Nothing was changed.", call. = FALSE)
}
say("PhyloPic answers (build ", build, "). Fetching.")

# ---------------------------------------------------------------------
# 2. Ask PhyloPic, one animal or plant at a time
# ---------------------------------------------------------------------
answered <- 0     # how many of the list PhyloPic answered for
tried <- 0
for (i in seq_len(total)) {
  key <- things$key[i]
  done_mark <- file.path(raw, paste0(key, ".done"))
  have <- found[found$key == key, , drop = FALSE]
  # finished earlier with exactly these names? then skip it
  finished <- file.exists(done_mark) && identical(read_text(done_mark), things$names[i])
  if (!finished) {
    tried <- tried + 1
    asked <- trimws(strsplit(things$names[i], "|", fixed = TRUE)[[1]])
    asked <- asked[nzchar(asked)]
    count <- nrow(have)
    reached <- FALSE          # did PhyloPic answer at all for this one?
    for (j in seq_along(asked)) {
      if (count >= want) break
      if (count >= 3 && j > 1) break
      name <- plain_name(asked[j])
      if (!nzchar(name)) next

      # 2a. which entry in PhyloPic's tree of life carries this name? (the first one listed is the closest match)
      text <- ask("/nodes", paste0("filter_name=", utils::URLencode(name, reserved = TRUE), "&page=0"),
                  file.path(raw, paste0(key, "-name", j, "-nodes.json")))
      if (nzchar(text)) reached <- TRUE
      node <- all_matches(paste0("/nodes/", uuid), text)
      if (length(node) == 0) next
      node <- sub("/nodes/", "", node[1], fixed = TRUE)

      # 2b. its silhouettes that may be used commercially and changed, each with its record (artist, licence)
      text <- ask("/images", paste0("embed_items=true&filter_clade=", node, "&filter_license_nc=false&filter_license_sa=false&page=0"),
                  file.path(raw, paste0(key, "-name", j, "-images.json")))
      ids <- unique(sub("/images/", "", all_matches(paste0("/images/", uuid), text), fixed = TRUE))
      ids <- setdiff(ids, have$image)
      complete <- grepl("\"_embedded\"", text, fixed = TRUE) && grepl("\"license\"", text, fixed = TRUE)

      # 2c. the drawings themselves
      for (id in ids) {
        if (count >= want) break
        n <- count + 1
        record <- file.path(raw, paste0(key, "-", n, ".json"))
        where <- text
        if (!complete) where <- ask(paste0("/images/", id), "", record)     # the list did not carry the record: ask for it
        address <- all_matches(paste0("https://[^\"\\\\ ]+/", id, "/vector\\.svg"), where)
        address <- if (length(address) > 0) address[1] else paste0("https://images.phylopic.org/images/", id, "/vector.svg")
        picture <- file.path(raw, paste0(key, "-", n, ".svg"))
        if (fetch(address, picture, tries = 2) && is_svg(picture)) {
          count <- n
          row <- data.frame(key = key, label = things$label[i], n = n, image = id, asked = asked[j],
                            file = paste0(key, "-", n, ".svg"), stringsAsFactors = FALSE)
          have <- rbind(have, row)
          found <- rbind(found, row)
        } else {
          if (file.exists(picture)) file.remove(picture)
          if (file.exists(record)) file.remove(record)
        }
      }
    }
    # mark as finished only if PhyloPic was reachable, so that a broken connection is tried again next time
    if (reached) {
      writeLines(things$names[i], done_mark)
      answered <- answered + 1
    }
    utils::write.csv(found, found_file, row.names = FALSE)
    # give up early instead of running for a long time for nothing
    if (tried == 5 && answered == 0) {
      say("PhyloPic gave no usable answer for the first five. Stopping here.")
      say("An example of what it answers: ",
          substr(get_body(paste0(api, "/nodes?build=", build, "&filter_name=hippopotamus%20amphibius&page=0")), 1, 300))
      say("Copy these lines into the chat with Claude.")
      options(old_timeout)
      stop("Stopped early.", call. = FALSE)
    }
  }
  if (i %% 10 == 0 || i == total) say("  ", i, " of ", total)
}

# ---------------------------------------------------------------------
# 3. Pack and report
# ---------------------------------------------------------------------
utils::write.csv(found, found_file, row.names = FALSE)
with_picture <- things$key %in% found$key
pictures <- file.path(raw, found$file)
size_mb <- round(sum(file.size(pictures), na.rm = TRUE) / 1024 / 1024, 1)

zip_file <- file.path(root, "r", "long-lost-cousin-raw.zip")
packed <- FALSE
if (nrow(found) > 0) {
  if (file.exists(zip_file)) file.remove(zip_file)
  here <- setwd(file.path(root, "r"))
  packed <- tryCatch({
    suppressWarnings(utils::zip("long-lost-cousin-raw.zip", "long-lost-cousin-raw", flags = "-r9Xq"))
    file.exists("long-lost-cousin-raw.zip")
  }, error = function(e) FALSE)
  setwd(here)
}

say("")
say("Silhouettes found for ", sum(with_picture), " of ", total, " animals and plants: ", nrow(found), " drawings, ", size_mb, " MB.")
if (any(!with_picture)) {
  say("Nothing found for ", sum(!with_picture), ": ", paste(things$key[!with_picture], collapse = ", "), ".")
}
if (nrow(found) == 0) {
  say("PhyloPic answered, but not in a way this script understands.")
  say("An example of what it answers: ",
      substr(get_body(paste0(api, "/nodes?build=", build, "&filter_name=hippopotamus%20amphibius&page=0")), 1, 300))
  say("Copy these lines into the chat with Claude.")
} else {
  say(if (packed) "Packed into r/long-lost-cousin-raw.zip." else "The zip could not be made. That is fine: the folder r/long-lost-cousin-raw/ is enough.")
  say("Done. Tell Claude it worked, and copy the lines above into the chat.")
}
options(old_timeout)
