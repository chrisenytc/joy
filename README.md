# Joy.js [![GH version](https://badge-me.herokuapp.com/api/gh/chrisenytc/joy.png)](http://badges.enytc.com/for/gh/chrisenytc/joy)

> A awesome sails stack

## Usage

Install dependencies

`sudo npm install`

Configure Environment Variables

```
NODE_ENV // production or development (optional)
PORT // port (optional)
MAIL_EMAIL // gmail account
MAIL_PASSWORD // gmail password
RECAPTCHA_PUBLIC_KEY // recaptcha public key
RECAPTCHA_PRIVATE_KEY // recaptcha private key
MONGOLAB_URI // mongolab (optional)
MONGOHQ_URL // mongohq (optional)
```

Configure AngularJS Settings

See more `assets/js/services/settingsConstant.js`

Build Project

`grunt`

Run Project

`sails lift`

## Contains

- Oauth2 provider
- Oauth2 clients
- Passport
- Login
- Signup
- Activation
- Logout
- Profile
- Nodemailer
- Recaptcha
- AngularJS
- Bower
- Swig
- Moment


## Addons on Views

#### user

The `user` contains informations about the current user

How to use this property

```html
<h1>{{ user.name }}</h1>
```

#### md5(string)

**Parameter**: `string`
**Type**: `String`
**Example**: `mystringtohash`


The `md5` method is responsible for encrypt string to md5

How to use this method

```html
{{ md5('mystringtohash') }}
```

#### formatName(name)

**Parameter**: `name`
**Type**: `String`
**Example**: `Joy Sampaio`


The `formatName` method is responsible for return a name and lastname

How to use this method

```html
{{ formatName('Joy Sampaio') }} // { name: 'Joy', lastname: 'Sampaio' }
```

## Addons in Controllers

#### res.sendResponse(statusCode, payload)

**Parameter**: `statusCode`
**Type**: `Number`
**Example**: `200`


**Parameter**: `payload`
**Type**: `Object`
**Example**: 
```javascript
{
    msg: 'Testing Joy.js'
}
```

The `sendResponse` method is responsible for send a custom jsonp response

How to use this method

```javascript
function(req, res) {
    return res.sendResponse(200, {msg: 'Testing Joy.js'});
}
```

#### res.sendMail(subject, email, templatePath, data)

**Parameter**: `subject`
**Type**: `String`
**Example**: `My Email Subject`


**Parameter**: `email`
**Type**: `String`
**Example**: `example@example.com`


**Parameter**: `templatePath`
**Type**: `String`
**Example**: `mail/example`


**Parameter**: `data`
**Type**: `Object`
**Example**:
```javascript
{
    name: 'Joy Sampaio',
    msg: 'Welcome'
}
```

The `getCaptcha` method is responsible for generate a recaptcha form

How to use this method

```javascript
function(req, res) {
    res.sendMail('My Email Subject', 'example@example.com', 'mail/example', {
        name: 'Joy Sampaio',
        msg: 'Welcome'
    });
}
```

#### req.getCaptcha(callback)

**Parameter**: `callback`
**Type**: `Function`
**Example**: 
```javascript
function(html) {
    console.log(html);
}
```

The `getCaptcha` method is responsible for generate a recaptcha form

How to use this method

```javascript
function(req, res) {
    return req.getCaptcha(function(html) {
        res.send(html);
    });
}
```

#### req.validateCaptcha(callback, isNative)

**Parameter**: `callback`
**Type**: `Function`
**Example**: 
```javascript
function(err, isValid) {
    if(err) {
        throw err;
    }
    if(isValid) {
        console.log('valid');
    }
    else {
        console.log('invalid');
    }
}
```

**Parameter**: `isNative`
**Type**: `Boolean`
**Example**: `true`


The `validateCaptcha` method is responsible for validate a recaptcha

How to use this method

```javascript
function(req, res) {
    return req.validateCaptcha(function(err, isValid) {
        if(err) {
            throw err;
        }
        if(isValid) {
            console.log('valid');
        }
        else {
            console.log('invalid');
        }
    }, true);
}
```

## Contributing

See the [CONTRIBUTING Guidelines](CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/chrisenytc/joy/issues).

## License

The MIT License

Copyright (c) 2014, Christopher EnyTC

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the EnyTC Corporation nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
