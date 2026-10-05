# Runs r/make-still-in.R against the PRETEND World Bank in a folder made by pretend_wb.py, on a COPY of the site
# (it writes data/still-in.js there). Only for testing: the figures are made up.
args <- commandArgs(trailingOnly = TRUE)
PRETEND <- args[1]; SITE <- args[2]; NONET <- length(args) > 2 && args[3] == "nonet"
TURNSOUT_FETCH <- function(url) {
  if (NONET && grepl("SP.POP.0014.TO.ZS", url, fixed = TRUE)) return(NULL)
  f <- if (grepl("/sources/2/series/", url)) file.path(PRETEND, paste0("meta_", sub(".*/series/([^/]+)/metadata.*", "\\1", url), ".json"))
       else if (grepl("/indicator/", url)) file.path(PRETEND, paste0("data_", sub(".*/indicator/([^?]+)\\?.*", "\\1", url), ".json"))
       else NA
  if (is.na(f) || !file.exists(f)) return(NULL)
  paste(readLines(f, warn = FALSE, encoding = "UTF-8"), collapse = "")
}
setwd(SITE)
source(file.path(SITE, "r", "make-still-in.R"))
