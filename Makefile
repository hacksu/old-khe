.PHONY: test start reload stop

# ------------------------------------------------------------------------------
# testing
# ------------------------------------------------------------------------------

# all
test:
	make api:test

vm\:test:
	make vm:api:test

# api only
api\:test:
	NODE_ENV=test mocha api/test/test.js

vm\:api\:test:
	vagrant ssh -c 'cd /var/www/api && NODE_ENV='test' mocha test/test.js'

# ------------------------------------------------------------------------------
# running
# ------------------------------------------------------------------------------

# all
start:
	echo "Start all not implemented yet"

vm\:start:
	echo "Start all not implemented yet"

# api only
api\:start:
	pm2 startOrReload api/processes.json --watch

api\:reload:
	pm2 reload api/processes.json

api\:stop:
	pm2 delete api

vm\:api\:start:
	vagrant ssh -c 'cd /var/www/api && pm2 startOrReload processes.json --watch'

vm\:api\:reload:
	vagrant ssh -c 'cd /var/www/api && pm2 reload processes.json'

vm\:api\:stop:
	vagrant ssh -c 'cd /var/www/api && pm2 delete api'

# front only
front\:start:
	echo "Front start not yet implemented"

front\:reload:
	echo "Front start not yet implemented"

front\:stop:
	echo "Front start not yet implemented"

vm\:front\:start:
	echo "Front start not yet implemented"

vm\:front\:reload:
	echo "Front start not yet implemented"

vm\:front\:stop:
	echo "Front start not yet implemented"

# staff only
staff\:start:
	echo "Staff start not yet implemented"

staff\:reload:
	echo "Staff start not yet implemented"

staff\:stop:
	echo "Staff start not yet implemented"

vm\:staff\:start:
	echo "Staff start not yet implemented"

vm\:staff\:reload:
	echo "Staff start not yet implemented"

vm\:staff\:stop:
	echo "Staff start not yet implemented"

# ------------------------------------------------------------------------------