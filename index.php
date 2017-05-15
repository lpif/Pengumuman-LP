<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="./assets/images/logo-blue.png" />

    <!-- Import Bootstrap CSS (currently use version 4 alpha 6)-->
    <link rel="stylesheet" href="./assets/css/bootstrap.min.css">

    <!-- Import main css -->
    <link rel="stylesheet" href="./assets/css/main.css">
    <title>Pengumuman LP</title>
  </head>

  <body>

    <!-- Empty navbar (only need the bar) -->
    <nav class="navbar navbar-light"></nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-12" id="dummy-server-time">
            <?php
                echo date('d-m-Y H:i:s');
            ?>
        </div>
      </div>
      <div class="row" id="current-date-row">
        <div class="col-3 caslon-font" id="current-date">
        </div>
      </div>


      <div class="row" id="current-time-row">
        <div class="col-3 caslon-font" id="current-time">
        </div>
      </div>

      <div class="row" id="logo-row">
      </div>

      <div id="status">
      </div>

      <div class="row" id="next-event-row">
      </div>
    </div>

    <div class="row" id="footer">
      <div class="col-12 gotham-font" id="footer-text">
        <center>reservasi.lp.if.its.ac.id</center>
      </div>
    </div>

    <!-- Import jquery script -->
    <script src="./assets/js/jquery-3.2.1.min.js"></script>

    <!-- Import Bootstrap script -->
    <script scr="./assets/js/bootstrap.min.js"></script>

    <!-- Import moment.js (library for date formating)-->
    <script src="./assets/js/moment.min.js"></script>

    <!-- Import lodash -->
    <script src="./assets/js/lodash.js"></script>

    <!-- Import main script -->
    <script src="./assets/js/main.js"></script>
  </body>
</html>
