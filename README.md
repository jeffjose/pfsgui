Changes
  1. Update nginx-webConfigurator.conf
  2. Reload nginx
    ```
    $ /usr/local/sbin/nginx -c /var/etc/nginx-webConfigurator.conf -s reload
    ```
  3. Copy over the bundle to `/usr/local/pfsgui` (Ensure auth.php is in there)
