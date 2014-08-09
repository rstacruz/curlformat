# curlformat

I like to do this in Firefox or Chrome. The output is unreadable though.

![image](etc/curl.png)

So what?
--------

This untangles that. Type `f` in your terminal, then paste the curl command.
Your command line should look like this:

```sh
$ fcurl 'http://site.com/article/new' -H 'Host: site.com' -H 'Connection: 
keep-alive' -H 'Accept-Language: en-us' -d "title=Hello&body=Welcome%20to%20" ...
```

BAM! Now readable!

```sh
$ http POST "http://site.com/article/new" \
    title="Hello" \
    body="Welcome to my site!"
```

That's sweet.
-------------

I know. Now pass `--extended` to make print more stuff that would've been supressed.

```sh
$ http OPTIONS "http://site.com/users" \
   Connection:"keep-alive" \
   Access-Control-Request-Method:"GET" \
   Origin:"http://site.com" \
   Accept-Encoding:"gzip, deflate" \
   ...
```

Cool beans
----------

Oh and you can also install [httpie]. The output of `curlformat` is compatible with httpie.

[httpie]: http://httpie.org

## :copyright:

**curlformat** © 2014+, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/curlformat/contributors
