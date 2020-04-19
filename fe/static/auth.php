<?php

include('auth.inc');

if(session_auth()) {
  echo "Logged in\n";
}else {
  echo "Not logged in\n";
}

