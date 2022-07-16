# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unrelased

### Added
  - Tier 3 support to Sector Scraper
  - `packbot.color_calibration` quest to quest list in README.md
  - How to find Tier 3 corps in sectors in HACKING_GUIDE.md

### Changed
  - Updated SCRIPTING_GUIDE.md to cover how to make scripts stateful
  - Updated SCRIPTING_GUIDE.md to cover how parse colored text
  - Improved Sector Scraper logic to better filter non-corp scripts

## Fixed
  - Formatting issues in HACKING_GUIDE.md
  - Formatting issues in README.md

## Removed
  - Removed _Quickly Farm GC from Tier 1 NPCs_ from HACKING_GUIDE.md (out of
    date)
  - Removed list of Tier 2 corporations since they're the same as the Tier 1
    corps with different extensions

## 2.0.0 - 2022-07-04

### Added
  - `CON_SPEC` lock cracker
  - Tier 2 Loc Harvester
  - Script for storing corporation names in MongoDB
  - Create `CON_SPEC` lock emulator
  - `dist` folder that contains all publish scripts for easy copy-paste

### Changed
  - Updated _Locs (NPCs and Players)_ and added a section about loc rotation in
    README.md 
  - Renamed `tools/loc_harvester` to `tools/loc_harvester_v1` (Breaking Change)
  - Renamed `tier1_plus_data_check.js` to `omni-cracker-v1.js` (Breaking Change)
  - Moved `under-500-character` crackers to root `crackers/` folder (Breaking
    Change)
  - Moved `under-500-character` crackers to root `crackers/` folder (Breaking
    Change)
  - Made Tier 1 lock cracker stateful
  - Updated README to cover the comission price of an item when it sells on the
    market
  - Updated README.md to cover how to use the repository scripts directly from
    `dist/`

### Fixed
  - `DATA_CHECK` lock not returning questions when called
  - `DATA_CHECK` lock not returning an 'access denied' message when called

### Removed
  - Deleted `crackers/tier1-cracker.js` (Breaking Change)
  - Removed Type checking via `jsconfig` (Breaking Change)
  - Deleted Hackmud class

## 1.10.0 - 2022-06-04

### Added
  - List of quests to _Life After VLAN_ in the README.md
  - Documentation for Events in README.md
  - Basic PvP guide to HACKING_GUIDE.md
  - List of Tier 2 corporations to HACKING_GUIDE.md
  - _How to Determine the Difficulty of a Loc_ to HACKING_GUIDE.md 

### Changed
  - Updated quiet list
  - Merged _Selling Multiple Items at Once_ into _Selling_ section of README.md

### Fixed
  - Typo in `magnara` lock description in LOCKS.md
  - Typos and ambiguities in HACKING_GUIDE.md

## 1.9.0 - 2022-06-02

### Added
  - Emulator for Tier 1 DATA_CHECK lock

### Changed
  - Moved _Upgrades_ section from _Life after VLAN_ to _Understanding Your
    System_

## 1.8.0 - 2022-05-30

### Added
  - How to use `chats` scripts and the chat window to README.md
  - How to change the color of your chat message text

### Changed
  - Updated _Life After VLAN_ and added a note about how to skip the tutorial

### Fixed
  - Missing/badly formatted TOC entries

## [1.7.0] - 2022-05-29

### Added
  - Ability to update your in-game "quiet" list with a list of known bots

### Changed
  - Start script prompts you to configure your environment if you haven't
    already
  - Start script remembers your Hackmud configuration directory between runs

### Fixed
  - Start script no longer shows retired users when asking what users to link
  - Incorrect description of `w4rn_er` and `w4rn` in LOCKS.md

## [1.6.0] - 2022-05-28

### Added
  - src/data for storing commonly used data in scripts (e.g., usernames, corp
    lists, etc)
  - Description and answers to Tier 2 `DATA_CHECK` locks in LOCKS.md
  - Descriptions of locs get exposed/leaked in README.md
  - `CON_TELL` to LOCKS.md
  - `w4rn` to LOCKS.md
  - `w4rn_er` to LOCKS.md

### Changed
  - Updated `sn_w_glock` description in LOCKS.md to include a list of helpful
    macros that will let you transfer money between accounts faster.
  - Migrated from `istanbul` to `c8` for code coverage.

### Fixed
  - Broken eslint config
  - Bugs in Sector Scraper causing it to not find all T2 NPC corps

## [1.5.1] - 2022-05-27

### Fixed
  - Missing entries from the Table of Contents in HACKING_GUIDE.md

## [1.5.0] - 2022-05-27

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