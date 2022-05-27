# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added
  - _How to Hack a Tier 2 Corporations_ to HACKING_GUIDE.md

### Changed
  - Reorganized the _How to Find Tier 1 Corporations in a Sector_ section in
    HACKING_GUIDE.md
  - Clarified what scripts can be found in a given sector in HACKING_GUIDE.md

### Fixed
  - Typos in examples in SCRIPTING_GUIDE.md
  - Sector Scraper returning duplicate scripts if a script was found in multiple
    sectors

## [1.4.0] - 2022-05-26

### Added
  - How to use the market to README.md
  - How to reset your autocompletes to README.md

### Changed
  - Updated _Upgrade Rarity_ and added details around how rarity level affects
    the stats of the upgrade.
  - Updated _Asking for Help_ and added a note about the `flying_shuttle`
    channel.
  - Updated _Tier_ and clarified how PVP vulnerabilities are shared between
    tiers.

## [1.3.0] - 2022-05-23

### Added
  - List of bots to add to your `quiet` list to README.md
  - `sn_w_glock` to LOCKS.md

### Changed
  - Reordered lock list in LOCKS.md so locks are ordered by perceived
    difficulty
  - Made LOCKS.md safer to read by collapsing spoilers
  - Made HACKING_GUIDE.md safer to read by collapsing spoilers
  - Made the description of `gui.quiet` more clear regarding what it actually
    does
  - Updated `magnara` description to no longer advocate for a brute-force
    approach

### Fixed 
  - Typo in command under _Configure Chat Message Display_

## [1.2.0] - 2022-05-22

### Added
  - Tier 2 section to LOCKS.md
  - Timeout check to `tier1_plus_data_check` cracker

### Changed
  - Reordered lock list in LOCKS.md to be in alphabetical order

### Fixed
  - Broken links in LOCKS.md Table of Contents

### Changed
  - Made the locks in LOCKS.md be in alphabetical order

## [1.1.1] - 2022-05-21

### Changed
  - Moved "helpful scripts" in LOCKS.MD to not be under `DATA_CHECK` section
  - Removed "Ditch the While Loop" from SCRIPTING_GUIDE.md

### Fixed
  - Broken "What is Hackmud?" Table of Contents link in README.md
  - Broken "Loading/Unloading Upgrades" Table of Contents link in README.md
  - Broken "Locs (NPCs and Players)" Table of Contents link in README.md
  - Broken "Tier 0 (Uninitialized)" Table of Contents link in README.md
  - Broken "Harvester / Scraper" Table of Contents link in SCRIPTING_GUIDE.md 
  - Broken "Hardline Count / Next Hardline" Table of Contents link in README.md 
  - Publish command bailing if a single script is empty
  - Publish command failing if `dist/` folder contains files

## [1.1.0] - 2022-05-17

### Added
  - A guide to all Tier 1 locks in LOCKS.md
  - Common uses cases for `#db` commands in SCRIPTING_GUIDE.md
  - Section on how to determine NPC difficulty and upgrades to HACKING_GUIDE.md
  - Table of Contents to HACKING_GUIDE.md

### Changed
  - Restructured HACKING_GUIDE.md to be clearer

### Fixed
  - Typos in README.md
  - Typos in HACKING_GUIDE.md

## [1.0.0] - 2022-05-15

Initial Release.