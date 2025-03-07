/*
_  ______   _____ _____ _____ _   _
| |/ / ___| |_   _| ____/___ | | | |
| ' / |  _    | | |  _|| |   | |_| |
| . \ |_| |   | | | |__| |___|  _  |
|_|\_\____|   |_| |_____\____|_| |_|

ANYWAY, YOU MUST GIVE CREDIT TO MY CODE WHEN COPY IT
CONTACT ME HERE +237656520674
YT: KermHackTools
Github: Kgtech-cmr
*/

const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

cmd(
  {
    pattern: 'checkupdate',
    alias: ['checkupgrade', 'checksync'],
    react: '🔍',
    desc: 'Check for updates without applying them.',
    category: 'misc',
    filename: __filename,
  },
  async (
    _0x16bb3a,
    _0x28ebc3,
    _0x20184b,
    { from: _0x38ab0b, reply: _0x585e21, sender: _0x5f51fe, isOwner: _0x607c9a }
  ) => {
    if (!_0x607c9a) {
      return _0x585e21('This command is only for the bot owner.');
    }
    try {
      const { data: commits } = await axios.get(
        'https://api.github.com/repos/Kgtech-cmr/KERM-MD-V1/commits'
      );

      let _0x1ebf53 = 'unknown';
      try {
        const _0xc59331 = require('../package.json');
        _0x1ebf53 = _0xc59331.commitHash || 'unknown';
      } catch (_0x2b6884) {
        console.error('Error reading package.json:', _0x2b6884);
      }

      const latestCommit = commits[0];
      const latestCommitHash = latestCommit.sha;

      if (latestCommitHash === _0x1ebf53) {
        return _0x585e21('```✅ Your KERM-MD bot is already up-to-date!```\n');
      } else {
        const commitMessages = commits
          .map(commit => {
            const date = new Date(commit.commit.author.date).toLocaleString('en-US', { timeZone: 'UTC' });
            return `🔄 **Commit**: [\`${commit.sha.slice(0, 7)}\`](${commit.html_url})\n👤 **Author**: ${commit.commit.author.name}\n📅 **Date**: ${date}\n📝 **Message**: ${commit.commit.message}`;
          })
          .join('\n\n');

        await _0x585e21(`🔄 **Updates are available for KERM-MD.**\n\n${commitMessages}\n\nTo update the bot, please run the command \`.update\``);
      }
    } catch (_0x781606) {
      console.error('Check update error:', _0x781606);
      _0x585e21('❌ Check update failed. Please try manually.');
    }
  }
);