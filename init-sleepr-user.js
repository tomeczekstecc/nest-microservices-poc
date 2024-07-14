db = db.getSiblingDB('sleepr');
db.createUser({
  user: "tomek",
  pwd: "tomek",
  roles: [
    { role: "readWrite", db: "sleepr" }
  ]
});
