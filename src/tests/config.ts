import { devices, WaitForOptions } from "puppeteer";

export const SNAPSHOT_PATH = "tests/snapshots";

export const GOTO_OPTIONS: WaitForOptions = { waitUntil: "networkidle0" };

export const DEVICES = {
  iPhone: devices["iPhone X"],
  iPad: devices["iPad"],
};
