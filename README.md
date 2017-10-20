# Don't Watch Later

A simple Google Chrome extension to disable autoplay for videos from your YouTube Watch Later playlist.

YouTube Watch Later Playlist URLs in the form

`https://www.youtube.com/watch?v=XXXXXXXXXXXX&index=123&list=WL`

will attempt to be rewritten as

`https://www.youtube.com/watch?v=XXXXXXXXXXXX`

to prevent YouTube's autoplay from being triggered.

## Why did you do this?

* I love YouTube, and I hate autoplay
* I wanted to make a minimalist Google Chrome extension

I usually open videos in a new tab from my Watch Later playlist, which automatically has the `list=WL` querystring parameter. I also don't usually watch videos in the order I added them to my Watch Later playlist. Instead of trying to hack YouTube's massive amounts of JavaScript, this extension does exactly what I need.

# Contact

Find me on Twitter: [@_Shakeel](https://twitter.com/_shakeel)

# License

[MIT](LICENSE)