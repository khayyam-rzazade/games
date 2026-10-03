# =====================================================================
#  Turns Out / 100 of Us: the question maker
#
#  What it does
#    1. reads   r/100-of-us-topics.csv   (one row per question)
#    2. pulls each figure from the World Bank's open data
#    3. writes  data/100-of-us.js        (the file the game reads)
#
#  How to run it
#    Open this file in RStudio and press "Source". Read what it prints.
#    Then push the changed data file with GitHub Desktop.
#
#  Rules it keeps
#    - Questions already in the data file never change, so day numbers
#      stay put. New rows in the topics file are added at the end.
#    - A figure is used only if the World Bank marks it with an open
#      licence (CC BY), or if it was checked by hand (column
#      licence_checked in the topics file).
#    - Answers below 5 or above 95 are left out. So are old figures.
#    - Nothing is invented: a row without a figure is left out and named.
# =====================================================================

start_date    <- NULL   # NULL keeps the start date already in the data file (a new file starts today).
                        # To set day 1 yourself, write for example "2026-10-10".
max_age_years <- 6      # figures older than this are left out
min_answer    <- 5
max_answer    <- 95
allowed_licence <- "^CC[ -]?BY"   # what a licence must start with to be used

# ---------------------------------------------------------------------
# 0. Tools
# ---------------------------------------------------------------------
if (!requireNamespace("jsonlite", quietly = TRUE)) install.packages("jsonlite")

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
    if (file.exists(file.path(d, "r", "100-of-us-topics.csv"))) return(d)
  }
  stop("I cannot find r/100-of-us-topics.csv. In RStudio choose Session > Set Working Directory > To Source File Location, then run again.", call. = FALSE)
}

# Reads a web address and returns its text, or NULL. Tries three times.
# (TURNSOUT_FETCH is only used for testing the script without the internet.)
fetch_text <- if (exists("TURNSOUT_FETCH", mode = "function")) TURNSOUT_FETCH else function(url) {
  old <- options(timeout = 60)
  on.exit(options(old))
  for (attempt in 1:3) {
    out <- tryCatch(
      suppressWarnings(paste(readLines(url, warn = FALSE, encoding = "UTF-8"), collapse = "")),
      error = function(e) NULL
    )
    if (!is.null(out) && nzchar(out)) return(out)
    Sys.sleep(1.5 * attempt)
  }
  NULL
}

# One World Bank series as a table: code, name, year, value, indicator_name
wb_rows <- function(area, indicator, from, to) {
  url <- sprintf("https://api.worldbank.org/v2/country/%s/indicator/%s?format=json&per_page=20000&date=%d:%d",
                 area, indicator, from, to)
  txt <- fetch_text(url)
  if (is.null(txt)) return(NULL)
  js <- tryCatch(jsonlite::fromJSON(txt, simplifyVector = FALSE), error = function(e) NULL)
  if (is.null(js) || length(js) < 2 || is.null(js[[2]]) || !length(js[[2]])) return(NULL)
  pick <- function(x, default = NA) if (is.null(x) || !length(x)) default else x
  rows <- js[[2]]
  data.frame(
    code  = vapply(rows, function(r) {
      iso <- pick(r$countryiso3code, "")
      if (nzchar(iso)) iso else pick(r$country$id, "")
    }, ""),
    name  = vapply(rows, function(r) pick(r$country$value, ""), ""),
    year  = suppressWarnings(as.integer(vapply(rows, function(r) as.character(pick(r$date, NA)), ""))),
    value = suppressWarnings(as.numeric(vapply(rows, function(r) as.character(pick(r$value, NA)), ""))),
    indicator_name = vapply(rows, function(r) pick(r$indicator$value, ""), ""),
    stringsAsFactors = FALSE
  )
}

# The licence the World Bank lists for an indicator, or NA if it cannot be read
wb_licence <- function(indicator) {
  url <- sprintf("https://api.worldbank.org/v2/sources/2/series/%s/metadata?format=json", indicator)
  txt <- fetch_text(url)
  if (is.null(txt)) return(NA_character_)
  m <- regmatches(txt, regexec('"id"\\s*:\\s*"License_Type"\\s*,\\s*"value"\\s*:\\s*"([^"]*)"', txt))[[1]]
  if (length(m) >= 2 && nzchar(m[2])) m[2] else NA_character_
}

round_half_up <- function(x) floor(x + 0.5)

# The figure shown next to the source: one decimal, or two when one decimal would look like a rounding mistake
shown_figure <- function(v) {
  one <- round(v, 1)
  if (abs((one * 10) %% 10 - 5) < 1e-9) round(v, 2) else one
}

read_existing <- function(path) {
  if (!file.exists(path)) return(NULL)
  txt <- paste(readLines(path, warn = FALSE, encoding = "UTF-8"), collapse = "\n")
  m <- regexpr('window\\.TURNSOUT_DATA\\["100-of-us"\\]\\s*=\\s*', txt)
  if (m < 0) stop("I could not read data/100-of-us.js, so I did not touch it.", call. = FALSE)
  body <- substring(txt, m + attr(m, "match.length"))
  body <- sub(";\\s*$", "", body)
  out <- tryCatch(jsonlite::fromJSON(body, simplifyVector = FALSE), error = function(e) NULL)
  if (is.null(out)) stop("I could not read data/100-of-us.js, so I did not touch it.", call. = FALSE)
  out
}

# ---------------------------------------------------------------------
# 1. Read the topics and what is already in the game
# ---------------------------------------------------------------------
root        <- find_root()
topics_path <- file.path(root, "r", "100-of-us-topics.csv")
cont_path   <- file.path(root, "r", "continents.csv")
data_path   <- file.path(root, "data", "100-of-us.js")

topics <- read.csv(topics_path, stringsAsFactors = FALSE, fileEncoding = "UTF-8",
                   na.strings = character(0), check.names = FALSE, colClasses = "character")
needed <- c("id", "colour", "type", "indicator", "area", "must_contain", "licence_checked", "question", "stamp", "sentence")
if (length(setdiff(needed, names(topics)))) {
  stop("The topics file misses these columns: ", paste(setdiff(needed, names(topics)), collapse = ", "), call. = FALSE)
}
topics[] <- lapply(topics, function(x) trimws(ifelse(is.na(x), "", x)))
topics <- topics[nzchar(topics$id), , drop = FALSE]
if (any(duplicated(topics$id))) {
  stop("These ids appear twice in the topics file: ", paste(unique(topics$id[duplicated(topics$id)]), collapse = ", "), call. = FALSE)
}
continents <- read.csv(cont_path, stringsAsFactors = FALSE, fileEncoding = "UTF-8", colClasses = "character")

existing <- read_existing(data_path)
fresh <- is.null(existing) || isTRUE(existing$starter)
questions <- if (fresh) list() else existing$questions
have <- vapply(questions, function(q) q$id, "")
start <- if (!is.null(start_date)) as.character(start_date) else if (fresh || is.null(existing$start)) format(Sys.Date()) else existing$start

this_year <- as.integer(format(Sys.Date(), "%Y"))
from_year <- this_year - max_age_years - 1

say("100 of Us: question maker")
say(if (fresh) "  Making a new question file." else paste0("  The game has ", length(questions), " questions. Looking for new rows in the topics file."))

# ---------------------------------------------------------------------
# 2. Population figures, pulled once (for every "share" question)
# ---------------------------------------------------------------------
todo <- topics[!(topics$id %in% have), , drop = FALSE]
pop <- NULL; pop_year <- NA
if (any(todo$type == "share")) {
  pop <- wb_rows("all", "SP.POP.TOTL", from_year, this_year)
  if (!is.null(pop)) {
    listed <- continents$code[continents$code != "_UNLISTED"]
    years <- sort(unique(pop$year[pop$code == "WLD" & !is.na(pop$value)]), decreasing = TRUE)
    for (y in years) {
      if (sum(pop$year == y & pop$code %in% listed & !is.na(pop$value)) >= 200) { pop_year <- y; break }
    }
  }
  if (is.null(pop) || is.na(pop_year)) say("  ! No population figures came back from the World Bank. Share questions are left out this time.")
  else say("  Population figures: World Bank, ", pop_year)
}

share_of_world <- function(area) {
  now <- pop[pop$year == pop_year & !is.na(pop$value), , drop = FALSE]
  world <- now$value[now$code == "WLD"][1]
  listed <- continents$code[continents$code != "_UNLISTED"]
  people <- function(codes) sum(now$value[now$code %in% codes])
  if (grepl("^continent:", area)) {
    cont <- sub("^continent:", "", area)
    codes <- continents$code[continents$continent == cont & continents$code != "_UNLISTED"]
    if (!length(codes)) return(NA_real_)
    total <- people(codes)
    # The World Bank's world total includes people it does not list as a separate economy.
    # The row _UNLISTED in continents.csv says which continent they belong to.
    if (any(continents$code == "_UNLISTED" & continents$continent == cont)) total <- total + (world - people(listed))
  } else if (grepl("^top:", area)) {
    n <- suppressWarnings(as.integer(sub("^top:", "", area)))
    v <- sort(now$value[now$code %in% listed], decreasing = TRUE)
    if (is.na(n) || n < 1 || length(v) < n) return(NA_real_)
    total <- sum(v[seq_len(n)])
  } else {
    codes <- strsplit(area, "+", fixed = TRUE)[[1]]
    if (!all(codes %in% now$code)) return(NA_real_)
    total <- people(codes)
  }
  100 * total / world
}

# ---------------------------------------------------------------------
# 3. One row at a time
# ---------------------------------------------------------------------
licence_cache <- list()
licence_for <- function(indicator, by_hand) {
  if (is.null(licence_cache[[indicator]])) licence_cache[[indicator]] <<- wb_licence(indicator)
  found <- licence_cache[[indicator]]
  if (!is.na(found)) return(found)          # what the World Bank says always wins
  if (nzchar(by_hand)) return(by_hand)      # otherwise the hand check in the topics file
  NA_character_
}

colours <- c("blue", "teal", "red", "violet", "green", "magenta")
added <- 0
left_out <- character(0)
skip <- function(id, why) { left_out <<- c(left_out, sprintf("  - %-22s left out: %s", id, why)) }

for (i in seq_len(nrow(todo))) {
  t <- todo[i, ]
  if (!(t$type %in% c("pct", "share"))) { skip(t$id, "type must be pct or share"); next }
  if (!nzchar(t$question) || !nzchar(t$stamp)) { skip(t$id, "question or stamp text is missing"); next }

  lic <- licence_for(t$indicator, t$licence_checked)
  if (is.na(lic)) { skip(t$id, "no licence found for this figure"); next }
  if (!grepl(allowed_licence, lic, ignore.case = TRUE)) { skip(t$id, paste0("licence is ", lic)); next }

  if (t$type == "share") {
    if (is.null(pop) || is.na(pop_year)) { skip(t$id, "no population figures"); next }
    value <- share_of_world(t$area)
    year <- pop_year
    link <- "https://data.worldbank.org/indicator/SP.POP.TOTL"
  } else {
    area <- if (nzchar(t$area)) t$area else "WLD"
    rows <- wb_rows(area, t$indicator, from_year, this_year)
    Sys.sleep(0.2)
    if (is.null(rows)) { skip(t$id, "the World Bank sent no figures"); next }
    rows <- rows[!is.na(rows$value) & !is.na(rows$year), , drop = FALSE]
    if (!nrow(rows)) { skip(t$id, paste0("no figure since ", from_year)); next }
    rows <- rows[order(rows$year, decreasing = TRUE), , drop = FALSE]
    if (nzchar(t$must_contain) && !grepl(t$must_contain, rows$indicator_name[1], fixed = TRUE)) {
      skip(t$id, paste0("the World Bank now calls this \"", rows$indicator_name[1], "\", so the question needs a new wording")); next
    }
    value <- rows$value[1]
    year <- rows$year[1]
    link <- paste0("https://data.worldbank.org/indicator/", t$indicator, if (area == "WLD") "?locations=1W" else "")
  }
  if (is.na(value)) { skip(t$id, "no figure for this place"); next }

  answer <- round_half_up(value)
  if (answer < min_answer || answer > max_answer) { skip(t$id, paste0("the answer would be ", answer)); next }

  sentence <- gsub("{rest}", as.character(100 - answer), t$sentence, fixed = TRUE)
  sentence <- gsub("{answer}", as.character(answer), sentence, fixed = TRUE)

  questions[[length(questions) + 1]] <- list(
    id = t$id,
    q = t$question,
    answer = as.integer(answer),
    exact = shown_figure(value),
    stamp = t$stamp,
    sentence = sentence,
    colour = if (t$colour %in% colours) t$colour else "blue",
    source = "World Bank",
    year = as.integer(year),
    licence = lic,
    link = link
  )
  added <- added + 1
  say(sprintf("  + %-22s %3d   (%s, %d)", t$id, as.integer(answer), format(shown_figure(value)), as.integer(year)))
}
if (length(left_out)) say(paste(left_out, collapse = "\n"))

# ---------------------------------------------------------------------
# 4. Write the file the game reads
# ---------------------------------------------------------------------
if (added == 0 && !fresh) {
  say("Nothing new to add. The data file was not changed.")
} else if (!length(questions)) {
  say("No question could be made, so the data file was not changed. Check your internet connection and run again.")
} else {
  out <- list(start = start, starter = FALSE, made = format(Sys.Date()), questions = questions)
  json <- jsonlite::toJSON(out, auto_unbox = TRUE, pretty = TRUE, digits = NA)
  text <- c(
    "/* 100 of Us: the questions. Made by r/make-100-of-us.R. Do not edit by hand. */",
    "window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};",
    paste0('window.TURNSOUT_DATA["100-of-us"] = ', json, ";")
  )
  con <- file(data_path, open = "w", encoding = "UTF-8")
  writeLines(text, con)
  close(con)
  last_day <- as.Date(start) + length(questions) - 1
  say("")
  say("Added ", added, if (added == 1) " question" else " questions", ". The game now has ", length(questions), " in all.")
  say("Day 1 is ", format(as.Date(start), "%d %B %Y"), ". The questions last until ", format(last_day, "%d %B %Y"), ".")
  say("File written: data/100-of-us.js")
  say("Next: push the change with GitHub Desktop.")
}
