var indexpage = `<!DOCTYPE html>
<html>
  <head>
    <title>Application</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  </head>
  <body>
    <h1>User Authentication</h1>
    <h3>Login</h3>
    <form action="/" method="post">
      <input type="text" name="logemail" placeholder="E-mail" required="">
      <input type="password" name="logpassword" placeholder="Password" required="">
      <input type="submit" value="LOGIN NOW">
    </form>
    <h3>Register</h3>
    <form action="/" method="post">
      <input type="text" name="email" placeholder="E-mail" required="">
      <input type="password" name="password" placeholder="Password" required="">
      <input type="password" name="passwordConf" placeholder="Confirm Password" required="">
      <input type="submit" value="REGISTER">
    </form>
  </body>
</html>
`;

var editpage = `<!DOCTYPE html>
<html>
  <head>
    <title>Edit Profile</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  </head>
  <body>
    <h1>Edit Profile</h1>
    <form action="/edit" method="post">
      <input type="text" name="edit_email" placeholder="E-mail"><br>
      <input type="text" name="edit_name" placeholder="Name"><br>
      <select name="edit_title" placeholder="Select Title">
           <option value="Mr."  >Mr.</option>
           <option value="Dr."  >Dr.</option>
           <option value="Miss.">Miss.</option>
           <option value="Mrs." >Mrs.</option>
      </select><br>
      <input type="text" name="edit_bio"><br>
      <select name="edit_timezone" id="DropDownTimezone">
          <option value="-12.0">(GMT -12:00) Eniwetok, Kwajalein</option>
          <option value="-11.0">(GMT -11:00) Midway Island, Samoa</option>
          <option value="-10.0">(GMT -10:00) Hawaii</option>
          <option value="-9.0">(GMT -9:00) Alaska</option>
          <option value="-8.0">(GMT -8:00) Pacific Time (US &amp; Canada)</option>
          <option value="-7.0">(GMT -7:00) Mountain Time (US &amp; Canada)</option>
          <option value="-6.0">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</option>
          <option value="-5.0">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</option>
          <option value="-4.0">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option>
          <option value="-3.5">(GMT -3:30) Newfoundland</option>
          <option value="-3.0">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
          <option value="-2.0">(GMT -2:00) Mid-Atlantic</option>
          <option value="-1.0">(GMT -1:00 hour) Azores, Cape Verde Islands</option>
          <option value="0.0">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
          <option value="1.0">(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris</option>
          <option value="2.0">(GMT +2:00) Kaliningrad, South Africa</option>
          <option value="3.0">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
          <option value="3.5">(GMT +3:30) Tehran</option>
          <option value="4.0">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
          <option value="4.5">(GMT +4:30) Kabul</option>
          <option value="5.0">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
          <option value="5.5">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
          <option value="5.75">(GMT +5:45) Kathmandu</option>
          <option value="6.0">(GMT +6:00) Almaty, Dhaka, Colombo</option>
          <option value="7.0">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
          <option value="8.0">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
          <option value="9.0">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
          <option value="9.5">(GMT +9:30) Adelaide, Darwin</option>
          <option value="10.0">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
          <option value="11.0">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
          <option value="12.0">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
      </select><br>
      <input type="text" name="edit_phone" placeholder="Phone"><br>
      <input type="text" name="edit_sms" placeholder="SMS"><br>
      <input type="submit" value="EDIT">
    </form>
  </body>
</html>`;

module.exports = {
    editpage, indexpage
}
