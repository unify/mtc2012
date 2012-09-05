# Unify application build script
# Part of Unify
# Copyright (C) 2012 Sebastian Fastner, Mainz, Germany


NAMESPACE = "mtc2012"

session.permutateField("debug")
session.permutateField("es5")
session.setField("application", NAMESPACE)

@task("Clear build cache")
def clean():
	session.clean()


@task("Clear caches and build results")
def distclean():
	session.clean()
	removeDir("build")
	removeDir("external")
	removeDir("source/script")

@task("Build the full api viewer into api folder")
def api():
	ApiWriter().write("data")
	# Generates API browser into api folder
	runTask("apibrowser", "build")

@task("Source version")
def source():
	unify.unify_source(jasy.env.State, NAMESPACE)


@task("Build version")
def build():
	unify.unify_build(jasy.env.State, NAMESPACE)

@task
def run():
	serve(routes = {
		"flickr" : {
			"debug" : True,
			"host" : "http://query.yahooapis.com/",
			"mirror" : False,
			"offline" : False
		}
	})

		
