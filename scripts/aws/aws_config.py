"""
AWS Configuration
=================

Shared configuration for AWS scripts (S3 sync, CloudFront invalidation, etc.).
Update these values to change the default bucket and prefix for all AWS operations.
"""

# Default S3 bucket name
BUCKET = 'llg-games'

# Default S3 prefix (path within bucket)
# All files will be synced to: s3://{BUCKET}/{S3_PREFIX}/{path}/
S3_PREFIX = 'games/drop-merge/'

# Category for DynamoDB GameCatalog (used by sync_game_catalog.py if present)
CATEGORY = 'drop-merge'

# Default paths to sync when no arguments provided (raw source for editor)
DEFAULT_PATHS = [
    'assets',
    'css',
    'phaserjs_editor_scripts_base',
    'src',
    'src/config/themes',
    'index.html',
    'test.html',
    'favicon.ico',
]

# Paths to sync for production (bundled build from dist/)
# Used with --from-dir dist when deploying production build
PRODUCTION_PATHS = [
    'index.html',
    'test.html',
    'assets',
    'js',
    'src/config',
]

# File extensions to skip (never sync or delete from S3)
SKIP_EXTENSIONS = {
    '.psd',
    '.scene',
    '.components',
}
