#!/bin/sh
cd /workspace || exit 1
if ! curl -sf -o /dev/null --max-time 1 http://127.0.0.1:8080/; then
  npm run dev >/tmp/jdc-dev.log 2>&1 &
fi
if [ -f /tmp/jdc-cron.pid ] && kill -0 "$(cat /tmp/jdc-cron.pid)" 2>/dev/null; then
  exit 0
fi
node --experimental-strip-types /workspace/scripts/news-cron.mjs >/tmp/jdc-cron.log 2>&1 &
echo $! >/tmp/jdc-cron.pid
exit 0
