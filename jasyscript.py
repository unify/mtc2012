# Unify application build script
# Part of Unify
# Copyright (C) 2012 Sebastian Fastner, Mainz, Germany


config.set("name" , "mtc2012")
fileManager = FileManager(session)

session.permutateField("debug")
session.permutateField("es5")
session.setField("application", config.get("name"))

@task("Clear build cache")
def clean():
	session.clean()


@task("Clear caches and build results")
def distclean():
	session.clean()
	fileManager.removeDir("build")
	fileManager.removeDir("external")
	fileManager.removeDir("source/script")

@task("Build the full api viewer into api folder")
def api():
	ApiWriter().write("data")
	# Generates API browser into api folder
	runTask("apibrowser", "build")

@task("Source version")
def source():
	unify.source(session, config)


@task("Build version")
def build():
	unify.build(session, config)

@task
def run():
	server = Server()
	server.setRoutes({
		"flickr" : {
			"debug" : True,
			"host" : "http://query.yahooapis.com/",
			"mirror" : False,
			"offline" : False
		}
	})
	server.start()

		
