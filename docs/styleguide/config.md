# Styleguide options

### Head

    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <script src='styledown.js'></script>
    <link rel='stylesheet' href='styledown.css' />
    <link rel='stylesheet' href='../../css/styles.css' />
    <style>
    .sg-canvas { position: relative; }
    .sg-canvas::after {
      clear: both;
      content: '';
      display: table;
    }
    </style>

### Body

    <div class='sg-container container' sg-content></div>
