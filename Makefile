# =============================================================================
# SIMURQ PROJECT MAKEFILE
# =============================================================================
# This Makefile provides convenient commands for development and production
# environments, including Docker management, Django operations, and utilities.

# Prevent make from treating target names as files
.PHONY: help build up down logs shell migrate createsuperuser test clean \
        dev-up dev-down dev-logs dev-shell dev-migrate dev-createsuperuser dev-test dev-clean \
        uvicorn celery celery-beat makemigrations freeze install uninstall \
        git-cache-clean diff models_to_txt app_to_txt run run-1

# =============================================================================
# VARIABLES
# =============================================================================
DC_PROD = docker-compose
DC_DEV = docker-compose -f docker-compose.dev.yml
MANAGE_LOCAL = python3 manage.py
MANAGE_DEV = $(DC_DEV) exec django python manage.py

# Colors for output
BLUE = \033[94m
GREEN = \033[92m
YELLOW = \033[93m
RED = \033[91m
BOLD = \033[1m
NC = \033[0m # No Color

# =============================================================================
# HELP & DOCUMENTATION
# =============================================================================

# Default target: Show help information
help:
	@echo ""
	@echo "$(BOLD)$(BLUE)╔══════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BOLD)$(BLUE)║                    SIMURQ PROJECT MAKEFILE                   ║$(NC)"
	@echo "$(BOLD)$(BLUE)╚══════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BOLD)$(GREEN)🐳 DOCKER COMMANDS$(NC)"
	@echo "$(YELLOW)  Production:$(NC)"
	@echo "    build                  🔨 Build Docker images"
	@echo "    up                     🚀 Start production services"
	@echo "    down                   🛑 Stop production services"
	@echo "    logs                   📋 Show production logs"
	@echo "    clean                  🧹 Clean production Docker resources"
	@echo ""
	@echo "$(YELLOW)  Development:$(NC)"
	@echo "    dev-up                 🚀 Start development services"
	@echo "    dev-down               🛑 Stop development services"
	@echo "    dev-logs               📋 Show development logs"
	@echo "    dev-shell              🐚 Open development Django shell"
	@echo "    dev-migrate            📊 Run development migrations"
	@echo "    dev-createsuperuser    👤 Create development superuser"
	@echo "    dev-test               🧪 Run development tests"
	@echo "    dev-clean              🧹 Clean development Docker resources"
	@echo ""
	@echo "$(BOLD)$(GREEN)🐍 DJANGO COMMANDS (Local)$(NC)"
	@echo "    shell                  🐚 Open Django shell"
	@echo "    run                    🏃 Run server on port 8000"
	@echo "    run-1                  🏃 Run server on port 8001"
	@echo "    migrate                📊 Run database migrations"
	@echo "    makemigrations         📝 Create migration files"
	@echo "    createsuperuser        👤 Create superuser"
	@echo "    test                   🧪 Run tests"
	@echo ""
	@echo "$(BOLD)$(GREEN)⚡ SERVER COMMANDS$(NC)"
	@echo "    uvicorn                🦄 Run Uvicorn server (port 8002)"
	@echo "    celery                 🌿 Run Celery worker"
	@echo "    celery-beat            ⏰ Run Celery beat scheduler"
	@echo ""
	@echo "$(BOLD)$(GREEN)📦 PACKAGE MANAGEMENT$(NC)"
	@echo "    install                📥 Install pip requirements"
	@echo "    uninstall              📤 Uninstall pip requirements"
	@echo "    freeze                 ❄️  Update requirements.txt"
	@echo ""
	@echo "$(BOLD)$(GREEN)📚 DOCUMENTATION$(NC)"
	@echo "    models_to_txt          📄 Export all models to text file"
	@echo "    app_to_txt             📁 Export app files to text (DIR=...)"
	@echo ""
	@echo "$(BOLD)$(GREEN)🔧 GIT UTILITIES$(NC)"
	@echo "    git-cache-clean        🗑️  Clear Git cache"
	@echo "    diff                   📊 Write Git diff to file"
	@echo ""
	@echo "$(BOLD)$(BLUE)Usage Examples:$(NC)"
	@echo "  make dev-up              # Start development environment"
	@echo "  make app_to_txt DIR=Core # Export Core app files"
	@echo "  make run                 # Start local Django server"
	@echo ""

# =============================================================================
# PRODUCTION COMMANDS
# =============================================================================

build:
	@echo "$(BLUE)🔨 Building Docker images...$(NC)"
	$(DC_PROD) build

up: build
	@echo "$(GREEN)🚀 Starting production services...$(NC)"
	$(DC_PROD) up -d

down:
	@echo "$(YELLOW)🛑 Stopping production services...$(NC)"
	$(DC_PROD) down

logs:
	@echo "$(BLUE)📋 Showing production logs...$(NC)"
	$(DC_PROD) logs -f

clean:
	@echo "$(RED)🧹 Cleaning production Docker resources...$(NC)"
	$(DC_PROD) down -v
	docker system prune -f

# =============================================================================
# DEVELOPMENT COMMANDS
# =============================================================================

dev-up:
	@echo "$(GREEN)🚀 Starting development services...$(NC)"
	$(DC_DEV) up -d --build

dev-down:
	@echo "$(YELLOW)🛑 Stopping development services...$(NC)"
	$(DC_DEV) down

dev-logs:
	@echo "$(BLUE)📋 Showing development logs...$(NC)"
	$(DC_DEV) logs -f

dev-shell:
	@echo "$(BLUE)🐚 Opening development Django shell...$(NC)"
	$(MANAGE_DEV) shell

dev-migrate:
	@echo "$(BLUE)📊 Running development migrations...$(NC)"
	$(MANAGE_DEV) migrate

dev-createsuperuser:
	@echo "$(BLUE)👤 Creating development superuser...$(NC)"
	$(MANAGE_DEV) createsuperuser

dev-test:
	@echo "$(BLUE)🧪 Running development tests...$(NC)"
	$(MANAGE_DEV) test

dev-clean:
	@echo "$(RED)🧹 Cleaning development Docker resources...$(NC)"
	$(DC_DEV) down -v
	docker system prune -f

# =============================================================================
# LOCAL DJANGO COMMANDS
# =============================================================================

shell:
	@echo "$(BLUE)🐚 Opening local Django shell...$(NC)"
	$(MANAGE_LOCAL) shell

run:
	@echo "$(GREEN)🏃 Running Django server on port 8000...$(NC)"
	$(MANAGE_LOCAL) runserver 0.0.0.0:8000

run-1:
	@echo "$(GREEN)🏃 Running Django server on port 8001...$(NC)"
	$(MANAGE_LOCAL) runserver 0.0.0.0:8001

migrate:
	@echo "$(BLUE)📊 Running local database migrations...$(NC)"
	$(MANAGE_LOCAL) migrate

makemigrations:
	@echo "$(BLUE)📝 Creating Django migration files...$(NC)"
	$(MANAGE_LOCAL) makemigrations

createsuperuser:
	@echo "$(BLUE)👤 Creating local superuser...$(NC)"
	$(MANAGE_LOCAL) createsuperuser

test:
	@echo "$(BLUE)🧪 Running local tests...$(NC)"
	$(MANAGE_LOCAL) test

# =============================================================================
# SERVER COMMANDS
# =============================================================================

uvicorn:
	@echo "$(GREEN)🦄 Starting Uvicorn server on port 8002...$(NC)"
	uvicorn Simurq.asgi:application --host 0.0.0.0 --port 8002 --reload

celery:
	@echo "$(GREEN)🌿 Starting Celery worker...$(NC)"
	celery -A Simurq worker -l info --concurrency=2

celery-beat:
	@echo "$(GREEN)⏰ Starting Celery beat scheduler...$(NC)"
	celery -A Simurq beat -l info

# =============================================================================
# PACKAGE MANAGEMENT
# =============================================================================

install:
	@echo "$(BLUE)📥 Installing pip requirements...$(NC)"
	pip install -r requirements.txt

uninstall:
	@echo "$(YELLOW)📤 Uninstalling pip requirements...$(NC)"
	pip uninstall -r requirements.txt -y

freeze:
	@echo "$(BLUE)❄️ Updating requirements.txt...$(NC)"
	./requirements_management.sh

# =============================================================================
# DOCUMENTATION & UTILITIES
# =============================================================================

models_to_txt:
	@echo "$(BLUE)📄 Exporting all models to all_models.txt...$(NC)"
	@( \
	  find . -type f -name models.py -not -path "*/migrations/*" | sort | \
	  while read f; do \
	    echo "===== BEGIN $$f ====="; \
	    cat "$$f"; \
	    echo; \
	    echo "===== END $$f ====="; \
	    echo; \
	  done \
	) > all_models.txt
	@echo "$(GREEN)✅ Models exported to all_models.txt$(NC)"

app_to_txt:
	@echo "$(BLUE)📁 Exporting app files to text...$(NC)"
	@cd $(DIR) && \
	OUTFILE=$$(basename "$$(pwd)")_files.txt && \
	rm -f $$OUTFILE && \
	find . -maxdepth 1 -type f ! -name "$$OUTFILE" | sort | while read f; do \
		echo "===== $$f =====" >> $$OUTFILE; \
		cat "$$f" >> $$OUTFILE; \
		echo "" >> $$OUTFILE; \
	done
	@echo "$(GREEN)✅ App files exported$(NC)"

# =============================================================================
# GIT UTILITIES
# =============================================================================

git-cache-clean:
	@echo "$(YELLOW)🗑️ Clearing Git cache...$(NC)"
	git rm -r --cached .
	git add .
	git commit -m "fixed untracked files"

diff:
	@echo "$(BLUE)📊 Writing Git diff to git_status.txt...$(NC)"
	git diff > git_status.txt
	@echo "$(GREEN)✅ Git diff saved to git_status.txt$(NC)"
