Back-End:
1. npm install
2. Buat Database 'article' lalu namakan table sebagai 'posts' dan total jumlah column adalah 7
Column tersebut antara lain(ikuti huruf besar dan kecilnya):
Id(Sebagai AI,Primary Key),Title(Sebagai Var Char), Content((Sebagai  Text), Category((Sebagai Var Char),
createdAt((Sebagai Date), updateAt((Sebagai Date), Status((Sebagai Var Char);

Cara lain membuat Table Database menggunakan migration:
1. Buat Database 'article';
2. Lalu jalankan migration 'npx sequelize-cli db:migrate' di root folder


Front-End:
1.npm install
2.npm run start