<p align="center">
  <img src="./BenCatMap.png" alt="Ứng dụng bản đồ thành phố Bến Cát">
</p>

## URL

- Website: https://bandobencat.vercel.app
- Admin website: https://bdbc-admin.vercel.app
- Admin account:
  - Username: `SuperAdmin`
  - Password: `Superadmin$123`

## Quick run (be)

1. Pull image from docker: `docker pull thanhsang1833/bcapi`
2. Run this image port 8080

## How to use this code

1. Download code `gh repo clone sang1833/DuongPhoBenCat`
2. Using VS code (_or any text editor/ IDE you want, I use VS code to make this project_), make 3 .env file for 3 folder: **be**, **fe** and **fe_admin**
3. Use command below:

- FE: `npm install && npm run dev`
- FE_ADMIN: `npm install && npm run dev`
- BE: `dotnet watch run`

## Tech stack

- FE: React, Leaflet, Protomaps
- BE: C# .Net
- DB: PostgreSQL

## Development environment

- VScode
- Nodejs: 18.18.0

## Note

Export data:
`pg_dump -h (oldHostUrl) -U doadmin -d (database) --encoding=UTF8 -p (port) -F c -f backup.dump`

Import:
`pg_restore -h (newHostUrl) -U doadmin --no-owner -d (database) -F c backup.dump`
