<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>
      {{ name }} examples
    </title>
  </head>
  <body>
    <header>
      <h1>
        {{ name }} examples
      </h1>
    </header>
    <nav>
      <ul>
        {% for example in examples %}
        <li><a href="{{ example }}">{{ example }}</a></li>
        {% endfor %}
      </ul>
    </nav>
  </body>
</html>
