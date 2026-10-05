# =====================================================================
#  Logicers / One of 193: the data maker
#
#  What it does
#    1. reads   r/one-of-193-workshop/countries.csv   the 193 UN member states, their UN regions and the
#               checked lists (landlocked, island, Mediterranean, equator, borders, left-hand traffic, euro)
#               r/one-of-193-workshop/lists.csv       the two sources of every list
#               r/one-of-193-workshop/questions.csv   the menu of yes-or-no questions
#               r/one-of-193-workshop/figures.csv     the World Bank figures the menu uses
#    2. pulls each figure for every country from the World Bank's open data, and each country's income group
#    3. writes  data/one-of-193.js                    (the file the game reads)
#
#  How to run it
#    Open this file in RStudio and press "Source". Read what it prints.
#    Then push the new data file with GitHub Desktop.
#    Run it again about once a year (the World Bank adds a new year of figures every July).
#
#  Rules it keeps
#    - A figure is used only if the World Bank marks it with an open licence (CC BY).
#    - For every country it takes the latest figure that is at most max_age_years old.
#    - A question is kept only if every one of the 193 countries has its figure. Otherwise the question is
#      left out (the game must answer every question for every country) and named in what the script prints.
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
    if (file.exists(file.path(d, "r", "one-of-193-workshop", "countries.csv"))) return(d)
  }
  stop("I cannot find r/one-of-193-workshop/countries.csv. In RStudio choose Session > Set Working Directory > To Source File Location, then run again.", call. = FALSE)
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

# One World Bank series for all countries: code, year, value, indicator_name (NULL if the World Bank did not answer)
wb_rows <- function(indicator, from, to) {
  url <- sprintf("https://api.worldbank.org/v2/country/all/indicator/%s?format=json&per_page=20000&date=%d:%d",
                 indicator, from, to)
  txt <- fetch_text(url)
  if (is.null(txt)) return(NULL)
  js <- tryCatch(jsonlite::fromJSON(txt, simplifyVector = FALSE), error = function(e) NULL)
  if (is.null(js) || length(js) < 2 || is.null(js[[2]]) || !length(js[[2]])) return(NULL)
  rows <- js[[2]]
  data.frame(
    code  = vapply(rows, function(r) pick(r$countryiso3code, ""), ""),
    year  = suppressWarnings(as.integer(vapply(rows, function(r) as.character(pick(r$date, NA)), ""))),
    value = suppressWarnings(as.numeric(vapply(rows, function(r) as.character(pick(r$value, NA)), ""))),
    indicator_name = vapply(rows, function(r) pick(r$indicator$value, ""), ""),
    stringsAsFactors = FALSE
  )
}

# The licence the World Bank lists for an indicator; NA if the answer names none, NULL if there was no answer at all
wb_licence <- function(indicator) {
  url <- sprintf("https://api.worldbank.org/v2/sources/2/series/%s/metadata?format=json", indicator)
  txt <- fetch_text(url)
  if (is.null(txt)) return(NULL)
  m <- regmatches(txt, regexec('"id"\\s*:\\s*"License_Type"\\s*,\\s*"value"\\s*:\\s*"([^"]*)"', txt))[[1]]
  if (length(m) >= 2 && nzchar(m[2])) m[2] else NA_character_
}

# Every economy the World Bank lists, with its income group (HIC, UMC, LMC, LIC; INX = not classified)
wb_income <- function() {
  txt <- fetch_text("https://api.worldbank.org/v2/country?format=json&per_page=400")
  if (is.null(txt)) return(NULL)
  js <- tryCatch(jsonlite::fromJSON(txt, simplifyVector = FALSE), error = function(e) NULL)
  if (is.null(js) || length(js) < 2 || !length(js[[2]])) return(NULL)
  rows <- js[[2]]
  out <- vapply(rows, function(r) pick(r$incomeLevel$id, ""), "")
  names(out) <- vapply(rows, function(r) pick(r$id, ""), "")
  out
}

# ---------------------------------------------------------------------
# 1. Read the tables
# ---------------------------------------------------------------------
root <- find_root()
ws <- file.path(root, "r", "one-of-193-workshop")
read <- function(name) {
  t <- read.csv(file.path(ws, name), stringsAsFactors = FALSE, encoding = "UTF-8",
                na.strings = character(0), check.names = FALSE, colClasses = "character")
  t[] <- lapply(t, function(x) trimws(ifelse(is.na(x), "", x)))
  t
}
countries <- read("countries.csv")
lists     <- read("lists.csv")
questions <- read("questions.csv")
figures   <- read("figures.csv")
data_path <- file.path(root, "data", "one-of-193.js")

if (nrow(countries) != 193 || any(duplicated(countries$iso3))) {
  stop("countries.csv must hold the 193 UN member states, each once. Nothing was written.", call. = FALSE)
}
list_ids <- setdiff(lists$id, c("regions", "members"))
if (length(setdiff(list_ids, names(countries)))) {
  stop("countries.csv misses a column for these lists: ", paste(setdiff(list_ids, names(countries)), collapse = ", "), call. = FALSE)
}

this_year <- as.integer(format(Sys.Date(), "%Y"))
from_year <- this_year - max_age_years

say("One of 193: data maker")
say("  ", nrow(countries), " countries, ", nrow(questions), " questions in the menu, ", nrow(figures), " World Bank figures.")

# ---------------------------------------------------------------------
# 2. The World Bank figures: the latest one for every country, at most max_age_years old
# ---------------------------------------------------------------------
fig_value <- list()     # key -> named numeric vector (by iso3)
fig_year  <- list()     # key -> named integer vector
fig_meta  <- list()     # key -> list(name, indicator, unit, licence, url)
fig_why   <- list()     # key -> why the figure cannot be used (or NULL)
no_answer <- character(0)

for (i in seq_len(nrow(figures))) {
  f <- figures[i, ]
  lic <- wb_licence(f$indicator)
  rows <- wb_rows(f$indicator, from_year, this_year)
  Sys.sleep(0.2)
  if (is.null(lic) || is.null(rows)) { no_answer <- c(no_answer, f$indicator); next }
  if (is.na(lic)) { fig_why[[f$key]] <- "no licence found for this figure"; next }
  if (!grepl(allowed_licence, lic, ignore.case = TRUE)) { fig_why[[f$key]] <- paste0("its licence is ", lic); next }
  rows <- rows[!is.na(rows$value) & !is.na(rows$year) & rows$year >= from_year, , drop = FALSE]
  wb_name <- if (nrow(rows)) rows$indicator_name[1] else ""
  if (nzchar(f$must_contain) && !grepl(f$must_contain, wb_name, fixed = TRUE)) {
    fig_why[[f$key]] <- paste0("the World Bank now calls it \"", wb_name, "\", so the questions need new wording"); next
  }
  rows <- rows[order(rows$code, -rows$year), , drop = FALSE]
  rows <- rows[!duplicated(rows$code), , drop = FALSE]          # the latest year for each country
  v <- setNames(rows$value, rows$code)[countries$iso3]
  y <- setNames(rows$year, rows$code)[countries$iso3]
  names(v) <- countries$iso3; names(y) <- countries$iso3
  missing <- countries$iso3[is.na(v)]
  fig_value[[f$key]] <- v
  fig_year[[f$key]] <- y
  fig_meta[[f$key]] <- list(name = wb_name, indicator = f$indicator, unit = f$unit, licence = lic,
                            url = paste0("https://data.worldbank.org/indicator/", f$indicator))
  if (length(missing)) {
    fig_why[[f$key]] <- paste0("no figure since ", from_year, " for ", length(missing), " countr",
                               if (length(missing) == 1) "y" else "ies", ": ", paste(head(missing, 12), collapse = " "),
                               if (length(missing) > 12) " ..." else "")
  }
  say(sprintf("  %-7s %-20s %s, years %s to %s%s", f$key, f$indicator, lic,
              min(y, na.rm = TRUE), max(y, na.rm = TRUE), if (length(missing)) paste0(", missing for ", length(missing)) else ""))
}
income <- wb_income()
if (is.null(income)) no_answer <- c(no_answer, "the list of countries and income groups")

if (length(no_answer)) {
  say("")
  say("The World Bank did not answer for: ", paste(no_answer, collapse = ", "), ".")
  say("Nothing was written. Check your internet connection and run again.")
  stop("No answer from the World Bank.", call. = FALSE)
}
inc <- income[countries$iso3]
names(inc) <- countries$iso3
inc[is.na(inc)] <- ""

# ---------------------------------------------------------------------
# 3. The menu: keep a question only if the phone can answer it for every country
# ---------------------------------------------------------------------
answer <- function(q, id) {
  c <- countries[countries$iso3 == id, ]
  switch(q$kind,
    region = c$region == q$key,
    sub    = c$sub == q$key,
    list   = c[[q$key]] == "1",
    above  = fig_value[[q$key]][[id]] > as.numeric(q$value),
    ref    = fig_value[[q$key]][[id]] > fig_value[[q$key]][[q$value]],
    income = inc[[id]] == q$key,
    NA)
}
kept <- list(); dropped <- list()
for (i in seq_len(nrow(questions))) {
  q <- questions[i, ]
  why <- NULL
  if (q$kind %in% c("above", "ref")) {
    if (!is.null(fig_why[[q$key]])) why <- fig_why[[q$key]]
    else if (is.null(fig_value[[q$key]])) why <- "the figure is missing"
  } else if (q$kind == "income") {
    if (any(!nzchar(inc))) why <- paste0("no income group for ", paste(countries$iso3[!nzchar(inc)], collapse = " "))
  } else if (q$kind == "list" && !(q$key %in% list_ids)) {
    why <- "unknown list"
  }
  if (is.null(why)) {
    a <- vapply(countries$iso3, function(id) isTRUE(answer(q, id)), TRUE)
    if (all(a) || !any(a)) why <- "every country gives the same answer"
  }
  if (!is.null(why)) { dropped[[length(dropped) + 1]] <- list(id = q$id, why = why); next }
  kept[[length(kept) + 1]] <- q
}

# Near a line: a figure within half a percent of the line, so a small revision could flip the answer.
# For "Bigger than X?" the line is X's own figure (X itself is not listed).
near <- character(0)
for (q in kept) {
  if (!(q$kind %in% c("above", "ref"))) next
  v <- fig_value[[q$key]]
  line <- if (q$kind == "above") as.numeric(q$value) else v[[q$value]]
  if (q$kind == "ref") v <- v[names(v) != q$value]
  close <- names(v)[abs(v - line) <= abs(line) * 0.005]
  if (length(close)) near <- c(near, sprintf("  %-10s %s", q$id, paste(close, collapse = " ")))
}

# Twins: countries that give the same answer to every kept question (the menu cannot tell them apart)
key_of <- vapply(countries$iso3, function(id) paste(vapply(kept, function(q) if (isTRUE(answer(q, id))) "1" else "0", ""), collapse = ""), "")
groups <- split(countries$iso3, key_of)
twins <- unname(groups[vapply(groups, length, 1L) > 1])

# ---------------------------------------------------------------------
# 4. Write the file the game reads
# ---------------------------------------------------------------------
if (length(kept) < 12) {
  stop("Only ", length(kept), " questions could be kept, too few for a game. Nothing was written.", call. = FALSE)
}
used_figs <- unique(unlist(lapply(kept, function(q) if (q$kind %in% c("above", "ref")) q$key else NULL)))
facts_figs <- intersect(c("pop", "area", "life", "urban", "net", "forest"), names(fig_value))
facts_figs <- facts_figs[vapply(facts_figs, function(k) is.null(fig_why[[k]]), TRUE)]
out_figs <- union(used_figs, facts_figs)

country_out <- lapply(seq_len(nrow(countries)), function(i) {
  c <- countries[i, ]
  f <- list()
  for (k in out_figs) {
    v <- fig_value[[k]][[c$iso3]]; y <- fig_year[[k]][[c$iso3]]
    if (!is.na(v)) f[[k]] <- list(signif(v, 7), as.integer(y))
  }
  list(id = c$iso3, iso2 = c$iso2, name = c$name, alt = c$alt, region = c$region, sub = c$sub,
       inc = inc[[c$iso3]], f = f)
})
lists_out <- list()
for (i in seq_len(nrow(lists))) {
  l <- lists[i, ]
  item <- list(name = l$name, src = list(list(name = l$source1, url = l$url1), list(name = l$source2, url = l$url2)))
  if (l$id %in% list_ids) item$ids <- I(countries$iso3[countries[[l$id]] == "1"])
  lists_out[[l$id]] <- item
}
tabs <- unique(questions[, c("tab", "tab_name")])
out <- list(
  made = format(Sys.Date()),
  countries = country_out,
  lists = lists_out,
  figures = fig_meta[out_figs],
  income = list(name = "World Bank income groups", url = "https://data.worldbank.org/country"),
  tabs = lapply(seq_len(nrow(tabs)), function(i) list(id = tabs$tab[i], name = tabs$tab_name[i])),
  questions = lapply(kept, function(q) {
    o <- list(id = q$id, tab = q$tab, q = q$question, kind = q$kind, key = q$key)
    if (nzchar(q$value)) o$value <- if (q$kind == "ref") q$value else as.numeric(q$value)
    o
  }),
  dropped = dropped,
  twins = lapply(twins, I)
)
# one country per line, so that a later run shows plainly which figures changed
compact <- function(x) as.character(jsonlite::toJSON(x, auto_unbox = TRUE, digits = NA, null = "null"))
rest <- out; rest$countries <- NULL
fields <- vapply(names(rest), function(k) paste0('  "', k, '": ', compact(rest[[k]])), "")
text <- c(
  "/* One of 193: the countries, the checked lists, the World Bank figures and the menu. Made by r/make-one-of-193.R. Do not edit by hand. */",
  "window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};",
  'window.TURNSOUT_DATA["one-of-193"] = {',
  '  "countries": [',
  paste0("    ", vapply(out$countries, compact, ""), c(rep(",", length(out$countries) - 1), "")),
  "  ],",
  paste0(fields, c(rep(",", length(fields) - 1), "")),
  "};"
)
dir.create(dirname(data_path), showWarnings = FALSE)
con <- file(data_path, open = "wb")                       # the bytes as UTF-8, whatever the computer's language settings
writeBin(charToRaw(enc2utf8(paste0(paste(text, collapse = "\n"), "\n"))), con)
close(con)

say("")
say("Kept ", length(kept), " of ", nrow(questions), " questions.")
if (length(dropped)) {
  say("Left out:")
  for (d in dropped) say(sprintf("  - %-10s %s", d$id, d$why))
}
if (length(near)) {
  say("Figures within half a percent of a line (the answer is right, but close):")
  say(paste(near, collapse = "\n"))
}
if (length(twins)) {
  say("Countries the menu cannot tell apart (the players must guess between them):")
  for (t in twins) say("  ", paste(t, collapse = " and "))
} else {
  say("Every country can be told apart from every other by the menu.")
}
say("File written: data/one-of-193.js")
say("Next: push the change with GitHub Desktop.")
