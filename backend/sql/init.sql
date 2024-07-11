CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY, -- UUID

  name TEXT,
  position INTEGER NOT NULL UNIQUE
);

-- split
CREATE TABLE IF NOT EXISTS equations (
  id TEXT PRIMARY KEY, -- UUID

  content TEXT NOT NULL -- LaTex content
);

-- split
CREATE TABLE IF NOT EXISTS workspace_equations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  equation_id TEXT NOT NULL UNIQUE,
  workspace_id TEXT NOT NULL,

  FOREIGN KEY (equation_id) REFERENCES equations(id) ON DELETE CASCADE,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

