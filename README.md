# ld48-42

This is a game created for Ludum Dare Compo 42, a 48 hour solo game making competition (there is also a Jam which is 72 hours and teams are allowed).
For more information, visit their website [here](https://ldjam.com).
Each Ludum Dare has a theme, the theme for Ludum Dare 42 was "Running out of space"

You can play the game exactly as it was after 48 hours-- bugs and all-- [here](https://nickgirardo.github.io/game/index.html).
The final competition source state has also been preserved in the branch [ld42-final](https://github.com/nickgirardo/ld48-42/tree/ld42-final).

I intend to go forward with a few bug fixes and some minor balance tweaks to create a more realized experience.
No changes which I believe would not be in the spirit of the original game are planned (for instance new enemies or complications like power-ups).
I will of course leave the 48 hour version unchanged.

## Differences between versions

Changes between competition version and current version
- Bugfix
    - Hi Scores correctly saved
    - Fixed bug where shooter enemies would no longer fire
- Balance
    - Bonus from collecting soul debris from fallen enemies now scales inversely with arena size.  This allows the player to come back after taking hits

The above list is not guaranteed to be complete, feel free to check through commits for a more complete understanding of changes

## Forthcoming planned changes

Not a complete list, not guaranteed to be completed in any timeframe
- Content
    - 'Game Over' sound effect
    - 'Player hit' sound effect
    - Background audio
- UI
    - Mute functionality

## Development

Running `npm run start:dev` starts an instance of the webpack-dev-server which allows you to run and work on the game quite easily.

## Thanks

- [bfxr](https://www.bfxr.net/): Used to create sound effects
- [freetypography.com](https://freetypography.com/): For the typeface [Lulu Monospace](https://freetypography.com/2018/06/19/free-font-lulu-monospace/)
