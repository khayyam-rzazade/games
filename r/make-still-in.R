# =====================================================================
#  Logicers / Still In: the data maker for the figures One of 193 does not have
#
#  What it does
#    1. reads   r/one-of-193-workshop/countries.csv   the 193 UN member states (the same countries as One of 193)
#               r/still-in-workshop/figures.csv        the World Bank figures that only Still In uses
#    2. pulls each figure for every country from the World Bank's open data
#    3. writes  data/still-in.js                      (the game reads it next to data/one-of-193.js)
#
#  Still In takes the countries, the checked lists and five figures (people, area, life expectancy, towns and
#  cities, forest) from One of 193's file, data/one-of-193.js. This script adds four more: GDP per person,
#  people online, people per square kilometre and people under 15. It never touches data/one-of-193.js.
#
#  How to run it
#    Open this file in RStudio and press "Source". Read what it prints.
#    Then push the new data file with GitHub Desktop.
#    Run it again about once a year (the World Bank adds a new year of figures every July).
#
#  Rules it keeps
#    - A figure is used only if the World Bank marks it with an open licence (CC BY).
#    - For every country it takes the latest figure that is at most max_age_years old.
#    - A country without a recent figure simply never appears in the rounds about that figure.
#      A figure that fewer than min_countries countries have is left out, and named in what the script prints.
#    - Nothing is invented. If the World Bank does not answer at all, nothing is written.
# =====================================================================

max_age_years   <- 6
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
    if (file.exists(file.path(d, "r", "one-of-193-workshop", "countries.csv")) &&
        file.exists(file.path(d, "r", "still-in-workshop", "figures.csv"))) return(d)
  }
  stop("I cannot find r/still-in-workshop/figures.csv. In RStudio choose Session > Set Working Directory > To Source File Location, then run again.", call. = FALSE)
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

pick <- function(x, default = NA) if (is.null(x) || !length(x)) default else x

# One World Bank series for all countries.
# Returns list(status = "ok", rows = data.frame(code, year, value, indicator_name)),
#         list(status = "unknown") if the World Bank answered but does not know the figure, or
#         list(status = "none") if there was no answer at all.
wb_rows <- function(indicator, from, to) {
  url <- sprintf("https://api.worldbank.org/v2/country/all/indicator/%s?format=json&per_page=20000&date=%d:%d",
                 indicator, from, to)
  txt <- fetch_text(url)
  if (is.null(txt)) return(list(status = "none"))
  js <- tryCatch(jsonlite::fromJSON(txt, simplifyVector = FALSE), error = function(e) NULL)
  if (is.null(js) || length(js) < 2 || is.null(js[[2]]) || !length(js[[2]])) return(list(status = "unknown"))
  rows <- js[[2]]
  list(status = "ok", rows = data.frame(
    code  = vapply(rows, function(r) pick(r$countryiso3code, ""), ""),
    year  = suppressWarnings(as.integer(vapply(rows, function(r) as.character(pick(r$date, NA)), ""))),
    value = suppressWarnings(as.numeric(vapply(rows, function(r) as.character(pick(r$value, NA)), ""))),
    indicator_name = vapply(rows, function(r) pick(r$indicator$value, ""), ""),
    stringsAsFactors = FALSE
  ))
}

# The licence the World Bank lists for an indicator; NA if the answer names none, NULL if there was no answer at all
wb_licence <- function(indicator) {
  url <- sprintf("https://api.worldbank.org/v2/sources/2/series/%s/metadata?format=json", indicator)
  txt <- fetch_text(url)
  if (is.null(txt)) return(NULL)
  m <- regmatches(txt, regexec('"id"\\s*:\\s*"License_Type"\\s*,\\s*"value"\\s*:\\s*"([^"]*)"', txt))[[1]]
  if (length(m) >= 2 && nzchar(m[2])) m[2] else NA_character_
}

# ---------------------------------------------------------------------
# 1. Read the tables
# ---------------------------------------------------------------------
root <- find_root()
read <- function(path) {
  t <- read.csv(path, stringsAsFactors = FALSE, encoding = "UTF-8",
                na.strings = character(0), check.names = FALSE, colClasses = "character")
  t[] <- lapply(t, function(x) trimws(ifelse(is.na(x), "", x)))
  t
}
countries <- read(file.path(root, "r", "one-of-193-workshop", "countries.csv"))
figures   <- read(file.path(root, "r", "still-in-workshop", "figures.csv"))
data_path <- file.path(root, "data", "still-in.js")

if (nrow(countries) != 193 || any(duplicated(countries$iso3))) {
  stop("countries.csv must hold the 193 UN member states, each once. Nothing was written.", call. = FALSE)
}

this_year <- as.integer(format(Sys.Date(), "%Y"))
from_year <- this_year - max_age_years

say("Still In: data maker")
say("  ", nrow(countries), " countries, ", nrow(figures), " World Bank figures.")

# ---------------------------------------------------------------------
# 2. The World Bank figures: the latest one for every country, at most max_age_years old
# ---------------------------------------------------------------------
fig_value <- list()     # key -> named numeric vector (by iso3), NA where missing
fig_year  <- list()     # key -> named integer vector
fig_meta  <- list()     # key -> list(name, indicator, unit, licence, url)
dropped   <- list()     # figures that cannot be used, and why
no_answer <- character(0)

for (i in seq_len(nrow(figures))) {
  f <- figures[i, ]
  got <- wb_rows(f$indicator, from_year, this_year)
  Sys.sleep(0.2)
  if (got$status == "none") { no_answer <- c(no_answer, f$indicator); next }
  if (got$status == "unknown") {
    dropped[[length(dropped) + 1]] <- list(id = f$key, why = "the World Bank has no figure under this code"); next
  }
  lic <- wb_licence(f$indicator)
  if (is.null(lic)) { no_answer <- c(no_answer, f$indicator); next }
  why <- NULL
  if (is.na(lic)) why <- "no licence found for this figure"
  else if (!grepl(allowed_licence, lic, ignore.case = TRUE)) why <- paste0("its licence is ", lic)
  rows <- NULL
  if (is.null(why)) {
    rows <- got$rows
    rows <- rows[!is.na(rows$value) & !is.na(rows$year) & rows$year >= from_year, , drop = FALSE]
    wb_name <- if (nrow(rows)) rows$indicator_name[1] else ""
    if (nzchar(f$must_contain) && !grepl(f$must_contain, wb_name, fixed = TRUE)) {
      why <- paste0("the World Bank now calls it \"", wb_name, "\", so the rounds need new wording")
    }
  }
  if (!is.null(why)) { dropped[[length(dropped) + 1]] <- list(id = f$key, why = why); next }
  rows <- rows[order(rows$code, -rows$year), , drop = FALSE]
  rows <- rows[!duplicated(rows$code), , drop = FALSE]          # the latest year for each country
  v <- setNames(rows$value, rows$code)[countries$iso3]
  y <- setNames(rows$year, rows$code)[countries$iso3]
  names(v) <- countries$iso3; names(y) <- countries$iso3
  have <- sum(!is.na(v))
  missing <- countries$iso3[is.na(v)]
  say(sprintf("  %-6s %-18s %s, years %s to %s, %d countries%s", f$key, f$indicator, lic,
              min(y, na.rm = TRUE), max(y, na.rm = TRUE), have,
              if (length(missing)) paste0(" (none since ", from_year, " for ", paste(head(missing, 12), collapse = " "),
                                          if (length(missing) > 12) " ..." else "", ")") else ""))
  if (have < as.integer(f$min_countries)) {
    dropped[[length(dropped) + 1]] <- list(id = f$key, why = paste0("only ", have, " countries have a figure since ", from_year,
                                                                       " (at least ", f$min_countries, " are needed)"))
    next
  }
  fig_value[[f$key]] <- v
  fig_year[[f$key]] <- y
  fig_meta[[f$key]] <- list(name = wb_name, indicator = f$indicator, unit = f$unit, licence = lic,
                            url = paste0("https://data.worldbank.org/indicator/", f$indicator))
}

if (length(no_answer)) {
  say("")
  say("The World Bank did not answer for: ", paste(no_answer, collapse = ", "), ".")
  say("Nothing was written. Check your internet connection and run again.")
  stop("No answer from the World Bank.", call. = FALSE)
}
if (!length(fig_meta)) {
  say("")
  for (d in dropped) say(sprintf("  - %-6s %s", d$id, d$why))
  say("None of the figures can be used. Nothing was written; the game plays with One of 193's figures alone.")
  stop("No figure could be used.", call. = FALSE)
}

# ---------------------------------------------------------------------
# 3. Write the file the game reads
# ---------------------------------------------------------------------
keys <- names(fig_meta)
per_country <- lapply(countries$iso3, function(id) {
  f <- list()
  for (k in keys) {
    v <- fig_value[[k]][[id]]; y <- fig_year[[k]][[id]]
    if (!is.na(v)) f[[k]] <- list(signif(v, 7), as.integer(y))
  }
  f
})
names(per_country) <- countries$iso3

compact <- function(x) as.character(jsonlite::toJSON(x, auto_unbox = TRUE, digits = NA, null = "null"))
country_lines <- vapply(countries$iso3, function(id) {
  f <- per_country[[id]]
  paste0('    "', id, '": ', if (length(f)) compact(f) else "{}")
}, "")
text <- c(
  "/* Still In: World Bank figures that One of 193 does not have (the rest comes from data/one-of-193.js). Made by r/make-still-in.R. Do not edit by hand. */",
  "window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};",
  'window.TURNSOUT_DATA["still-in"] = {',
  paste0('  "made": ', compact(format(Sys.Date())), ","),
  paste0('  "figures": ', compact(fig_meta), ","),
  paste0('  "dropped": ', if (length(dropped)) compact(dropped) else "[]", ","),
  '  "f": {',
  paste0(country_lines, c(rep(",", length(country_lines) - 1), "")),
  "  }",
  "};"
)
dir.create(dirname(data_path), showWarnings = FALSE)
con <- file(data_path, open = "wb")                       # the bytes as UTF-8, whatever the computer's language settings
writeBin(charToRaw(enc2utf8(paste0(paste(text, collapse = "\n"), "\n"))), con)
close(con)

say("")
say("Kept ", length(keys), " of ", nrow(figures), " figures: ", paste(keys, collapse = ", "), ".")
if (length(dropped)) {
  say("Left out:")
  for (d in dropped) say(sprintf("  - %-6s %s", d$id, d$why))
}
say("File written: data/still-in.js")
say("Next: push the change with GitHub Desktop.")
