Meteor.Collection.prototype.Utils = {

  // examples of using the date validators on a birthday
  // if(params.birthdate){
  //   var dob = new Date(params.birthdate);
  //   console.log('dob: ' + dob);
  //   console.log('Users.Utils.isDate(dob): ' + Users.Utils.isDate(dob) );
  //   console.log('Users.Utils.isValidDate(dob): ' + Users.Utils.isValidDate(dob) );
  //   if(!Users.Utils.isDate(dob) || !Users.Utils.isValidDate(dob)){
  //     throw 'Invalid Birthdate.';
  //   }
  // }
  isDate: function(obj) {
  /// <summary>
  /// Determines if the passed object is an instance of Date.
  /// </summary>
  /// <param name="obj">The object to test.</param>

      return Object.prototype.toString.call(obj) === '[object Date]';
  },

  isValidDate: function(obj) {
  /// <summary>
  /// Determines if the passed object is a Date object, containing an actual date.
  /// </summary>
  /// <param name="obj">The object to test.</param>

      return this.isDate(obj) && !isNaN(obj.getTime());
  },

  validateParams: function(params) {
    for (var key in params) {
      value = params[key];
      // console.log('Object.prototype.toString.call: ' + Object.prototype.toString.call(value) );
      // console.log('value: ' + value);
      // console.log('_.isEmpty(value): ' + _.isEmpty(value));
      // console.log('_.isUndefined(value): ' + _.isUndefined(value));
      // console.log('_.isNull(value): ' + _.isNull(value));
      // console.log('_.isNaN(object): ' + _.isNaN(value) );
      // console.log('_.isNumber(object): ' + _.isNumber(value) );
      // console.log('_.isFinite(object): ' + _.isFinite(value) );
      //removed  _.isEmpty(value) || and had to put it back in but that screws up
      if(_.isNumber(value)){
        // console.log('number');
        if( _.isUndefined(value) || _.isNull(value)){
          throw 'Please enter <b>'+ key.replace(/_/g, ' ') + '</b>.';
        }
      } else if (!_.isBoolean(value) && !_.isDate(value) ){
        // console.log('not boolean and not date');
        if(_.isEmpty(value) ||  _.isUndefined(value) || _.isNull(value)) {
          throw 'Please enter <b>'+ key.replace(/_/g, ' ') + '</b>.';
        }
      }
    }
    
    if ( params.hasOwnProperty('email') ) {
      this.validateEmail(params.email);
    }

    if ( params.hasOwnProperty('username') ){
      this.validateUsername(params.username);
    }

    if ( params.hasOwnProperty('password') ){
      this.validatePassword(params.password);
    }
  },

  validateEmail: function(email, name) {
    // use either of these
    //var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    //   /^([a-zA-Z0-9_.-\+])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
    //   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\  ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA  -Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\  ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA  -Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)){
      if(name){
        throw name.replace(/_/g, ' ') + ' must be a valid email address.';
      } else {
        throw 'Please enter a valid <b>email</b> address.';
      }
    }
  },

  //Username
  //Supports alphabets and numbers no special characters except underscore('_') min 3 and max 20 characters.
  //var ck_username = /^[A-Za-z0-9_]{3,20}$/;
  validateUsername: function(username){
    var ck_username = /^[A-Za-z0-9._-]{3,20}$/;
    if (!ck_username.test(username)) {
      throw 'Please enter a username 3 to 20 characters in length with no special characters except dot ("."), underscore ("_") and dash("-").';
    }
  },
  //Password
  //Password supports special characters and here min length 6 max 20 charters.
  //var ck_password = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;
  validatePassword: function(password){
    var ck_password = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;
    if (!ck_password.test(password)) {
      throw 'Please enter a password 6 to 20 characters in length.';
    }
  },

  validateAlphaNumericOnly: function(name, value){
    //console.log(value);
    var ck_alpha_numeric = /^[a-z0-9 ]+$/i;
    //console.log( ck_alpha_numeric.test(value) );
    if(!ck_alpha_numeric.test(value)){
      throw name.replace(/_/g, ' ') + ' must be alpha-numeric.';
    }
  },
  
  validateAlphaNumericOnlyNoSpaces: function(name, value){
    //console.log(value);
    var ck_alpha_numeric = /^[a-zA-Z0-9]+$/;
    //console.log( ck_alpha_numeric.test(value) );
    if(!ck_alpha_numeric.test(value)){
      throw name.replace(/_/g, ' ') + ' must be alpha-numeric with no spaces.';
    }
  },
  
  validateAlphaNumericDashUnderscoreOnlyNoSpaces: function(name, value){
    //console.log(value);
    var ck_alpha_numeric = /^[a-zA-Z0-9-_]+$/;
    //console.log( ck_alpha_numeric.test(value) );
    if(!ck_alpha_numeric.test(value)){
      throw name.replace(/_/g, ' ') + ' must be alpha-numeric with no spaces.';
    }
  },
  validateUrl: function(name, value){
    var ck_var = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    if(!ck_var.test(value)){
      throw name.replace(/_/g, ' ') + ' must be a valid url.';
    }
  },
  isNumeric: function(name, value){
    if(isNaN(value) || value == '' || value == null || value == undefined){
     throw name.replace(/_/g, ' ') + ' must be a valid number.';
    }
  }
};