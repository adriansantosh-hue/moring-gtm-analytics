# Dark variant (first version, 2026-10-01 to 10-02)

The first full set used a dark teal look. The finished GIFs are kept in `assets/gifs/linkedin-square-dark/`. To rebuild that look, set these in `engine/lib.js` and `engine/specs.js` (they were swapped for the light theme):

- palette `C`: bg `#082F34`, panel `#0F4147`, panel2 `#174E55`, line `#3F7076`, mute `#4B8087`, soft `#9FB6B9`, txt `#FFFFFF`, txt2 `#E4E8EC`, coral `#FF7649`, ok `#DFF5EE`
- stage background: coral radial glow top right `rgba(255,118,73,.20)`, teal glow bottom left `rgba(75,128,135,.42)`, 54 px line grid `rgba(255,255,255,.045)`
- glass: fill `rgba(255,255,255,.06)`, inset white highlights `rgba(255,255,255,.30)`, dark drop shadows
- logo chips: white chips for dark marks, translucent dark glass for white marks (Okta); footer text logo `logo-moring-light.svg`
- ThoughtLine shimmer: white gradient; LatticeLoader / StatusMark ink white

The website itself is light, so light is the default.
