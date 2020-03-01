# needlessly-long-status
Set your League status to anything!

Some of y'all were asking how I got my League status so loooonnnnggg. Well, the short answer is through some ✨\*code magic\*✨. 
Long answer is by using the hidden API's built into the League client to bypass the client-side limit on the status text.

When the League client runs, it exposes a server and an API (known as the LCU API) such that each individual part can communicate with each other seamlessly (barring the 
*very* well-documented client bugs). This fact has been known since the [rewrite in 2016](https://technology.riotgames.com/news/architecture-league-client-update). 
Though unofficial, the community on the [Riot Developers' Discord](https://discordapp.com/invite/riotapi) has created a very convenient [Node.js connector](https://github.com/Pupix/lcu-connector)
and generated [relevant Swagger docs](http://www.mingweisamuel.com/lcu-schema/tool/#/). 

Using these community-created tools, `needlessly-long-status` is an interface to interact with the chat status API so that **you don't have to mess with any code.**

# Installation
Simply grab the [newest release (click me)](https://github.com/aaronkh/needlessly-long-status/releases/download/1.1/needlessly-long-status-win32-x64.zip) above and click on `the needlessly-long-status.exe` file once extracted. It should be pretty straightforward from that point on.
Note that there is a *soft* limit on how many characters your status can be; I found that, at about 1500 characters, the friends list does not stay connected. 
At roughly 2000 characters, the friends list does not load at all. So please be reasonable!

```
- I claim no responsbility for any damage to your League client, your computer, or yourself. Use this tool at your own discretion. 
- Created with Electron/Node.js and as few other JS libraries as possible.
- You may have to restart your client before it works.
- If anyone plays League on a Mac and/or wants to volunteer to test or build, feel free to drop a pull request or add me on league at Ieaverbuster.
```
