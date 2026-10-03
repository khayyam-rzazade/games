# =====================================================================
#  Turns Out / Same Street: the photo fetcher
#
#  What it does
#    1. reads   r/same-street-photos.csv   (one row per photo: file name and web address)
#    2. copies each photo from Dollar Street into  same-street/photos/
#
#    3. moves photos that are no longer on the list into
#       same-street/unused-photos/  (they are moved, never deleted;
#       that folder is not sent to GitHub, and you may delete it yourself)
#
#  How to run it
#    Open this file in RStudio and press "Source". Read what it prints.
#    The first run takes two or three minutes. Then commit and push with GitHub Desktop.
#    Running it again is safe: photos that are already there are skipped.
#
#  The photos
#    Dollar Street is a Gapminder project. Free material from GAPMINDER.ORG,
#    CC-BY LICENSE (CC BY 4.0). The families can ask Dollar Street to take
#    a photo down. To see whether that happened, set check_again to TRUE
#    below and run the script: it lists every photo Dollar Street no longer
#    has, so that the home can be taken out of the game.
# =====================================================================

check_again <- FALSE   # TRUE: do not copy anything, only ask Dollar Street whether each photo is still there

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
    if (file.exists(file.path(d, "r", "same-street-photos.csv"))) return(d)
  }
  stop("I cannot find r/same-street-photos.csv. In RStudio choose Session > Set Working Directory > To Source File Location, then run again.", call. = FALSE)
}

# Copies one web address into a file. Returns TRUE if it worked.
# (TURNSOUT_DOWNLOAD is only used for testing the script without the internet.)
download_one <- if (exists("TURNSOUT_DOWNLOAD", mode = "function")) TURNSOUT_DOWNLOAD else function(url, dest) {
  ok <- tryCatch(
    suppressWarnings(utils::download.file(utils::URLencode(url), dest, mode = "wb", quiet = TRUE)) == 0,
    error = function(e) FALSE
  )
  isTRUE(ok)
}

# A real photo starts with the two bytes every JPEG file starts with.
is_photo <- function(path) {
  if (!file.exists(path) || file.size(path) < 2000) return(FALSE)
  first <- tryCatch(readBin(path, "raw", n = 2), error = function(e) raw(0))
  length(first) == 2 && first[1] == as.raw(0xff) && first[2] == as.raw(0xd8)
}

# Tries three times, and keeps the file only if it is a real photo.
fetch_photo <- function(url, dest) {
  for (attempt in 1:3) {
    tmp <- paste0(dest, ".part")
    if (file.exists(tmp)) file.remove(tmp)
    if (download_one(url, tmp) && is_photo(tmp)) {
      if (file.exists(dest)) file.remove(dest)
      file.rename(tmp, dest)
      return(TRUE)
    }
    if (file.exists(tmp)) file.remove(tmp)
    Sys.sleep(attempt)
  }
  FALSE
}

# ---------------------------------------------------------------------
# 1. Read the list
# ---------------------------------------------------------------------
old_timeout <- options(timeout = 120)
root <- find_root()
list_file <- file.path(root, "r", "same-street-photos.csv")
photos <- utils::read.csv(list_file, stringsAsFactors = FALSE)
need <- c("file", "url")
if (!all(need %in% names(photos))) stop("r/same-street-photos.csv must have the columns: file, url.", call. = FALSE)
photos <- photos[nzchar(photos$file) & nzchar(photos$url), , drop = FALSE]
if (any(grepl("[/\\\\]", photos$file))) stop("A file name in r/same-street-photos.csv contains a slash. Nothing was changed.", call. = FALSE)
if (!all(grepl("^https://", photos$url))) stop("Every web address in r/same-street-photos.csv must start with https://. Nothing was changed.", call. = FALSE)

folder <- file.path(root, "same-street", "photos")
dir.create(folder, recursive = TRUE, showWarnings = FALSE)
total <- nrow(photos)
say("Same Street: ", total, " photos on the list.")

# ---------------------------------------------------------------------
# 2a. Only ask whether each photo is still on Dollar Street
# ---------------------------------------------------------------------
if (isTRUE(check_again)) {
  gone <- character(0)
  for (i in seq_len(total)) {
    tmp <- tempfile(fileext = ".jpg")
    still <- fetch_photo(photos$url[i], tmp)
    if (file.exists(tmp)) file.remove(tmp)
    if (!still) gone <- c(gone, photos$file[i])
    if (i %% 25 == 0 || i == total) say("  asked about ", i, " of ", total)
  }
  if (length(gone) == 0) {
    say("Done. Dollar Street still has all ", total, " photos. Nothing to do.")
  } else {
    say("Done. Dollar Street no longer has ", length(gone), " of the photos:")
    say("  ", paste(gone, collapse = ", "))
    say("The part before the dash is the home. Tell Claude these names, so the homes can be taken out of the game.")
  }
} else {

# ---------------------------------------------------------------------
# 2b. Copy the photos that are not here yet
# ---------------------------------------------------------------------
  already <- 0
  fetched <- 0
  failed <- character(0)
  for (i in seq_len(total)) {
    dest <- file.path(folder, photos$file[i])
    if (is_photo(dest)) {
      already <- already + 1
    } else if (fetch_photo(photos$url[i], dest)) {
      fetched <- fetched + 1
    } else {
      failed <- c(failed, photos$file[i])
    }
    if (i %% 25 == 0 || i == total) say("  ", i, " of ", total)
  }

  # Photos that are in the folder but no longer on the list are moved aside, never deleted.
  extra <- setdiff(list.files(folder, pattern = "\\.jpe?g$", ignore.case = TRUE), photos$file)
  moved <- 0
  if (length(extra) > 0) {
    aside <- file.path(root, "same-street", "unused-photos")
    dir.create(aside, recursive = TRUE, showWarnings = FALSE)
    moved <- sum(file.rename(file.path(folder, extra), file.path(aside, extra)))
  }

  here <- sum(vapply(file.path(folder, photos$file), is_photo, logical(1)))
  size_mb <- round(sum(file.size(file.path(folder, photos$file)), na.rm = TRUE) / 1024 / 1024, 1)
  say("")
  say("Copied now: ", fetched, ". Already there: ", already, ". Could not copy: ", length(failed), ".")
  say("In same-street/photos: ", here, " of ", total, " photos, ", size_mb, " MB.")
  if (length(extra) > 0) {
    say("Moved ", moved, " of ", length(extra), " photos that are no longer on the list into same-street/unused-photos/. Nothing was deleted.")
  }
  if (length(failed) == 0) {
    say("All photos are in place. Tell Claude it worked.")
  } else {
    say("These could not be copied:")
    say("  ", paste(failed, collapse = ", "))
    say("Run the script once more. If the same names come back, tell Claude the names.")
  }
}
options(old_timeout)
