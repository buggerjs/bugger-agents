
.PHONY: test
test:
	@npm run --silent --no-spin test

TYPES_FILES = $(wildcard lib/agents/*.types.js | sort)
AGENTS = $(TYPES_FILES:lib/agents/%.types.js=lib/agents/%)
migrate-agents: $(AGENTS)

lib/agents/%: lib/agents/%.types.js
	mkdir -p $@
	mv $< $@"/types.js"
	mv $@".js" $@"/index.js"
	mv $@".probe.js" $@"/probe.js" || echo "No probe found"

clean-agents:
	rm -r $(AGENTS)
