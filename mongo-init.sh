mongosh -- "sleepr" <<EOF
db.createUser({user:"tomek2",pwd: "tomek2",roles: [{role: "readWrite", db: "sleepr"}]})
