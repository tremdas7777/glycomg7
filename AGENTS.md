# Architecture rules

- Store payment-only product names in `private_settings` and read them server-side for every new charge; keep storefront names, prices and analytics independent of gateway labels.
- Protect gateway-name administration inside each server function before loading the privileged client; the admin page itself is not an authorization boundary.