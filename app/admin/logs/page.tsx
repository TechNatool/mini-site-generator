'use client';

import { useState, useEffect } from 'react';

type LogType = 'app' | 'actions' | 'emails' | 'deploy';

interface LogEntry {
  timestamp: string;
  level: string;
  type: string;
  message: string;
  [key: string]: any;
}

interface LogStats {
  size: number;
  lines: number;
  lastModified: string;
}

export default function AdminLogsPage() {
  const [logType, setLogType] = useState<LogType>('app');
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<LogStats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadLogs();
  }, [logType]);

  const loadLogs = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/logs?type=${logType}&limit=200`);
      const data = await response.json();

      if (response.ok) {
        setEntries(data.entries || []);
        setStats(data.stats);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to load logs' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load logs' });
    } finally {
      setIsLoading(false);
    }
  };

  const clearLogs = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir effacer le log "${logType}" ?`)) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/logs?type=${logType}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Log effacé avec succès' });
        setEntries([]);
        setStats(null);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to clear logs' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to clear logs' });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadLogs = () => {
    const content = entries.map((entry) => JSON.stringify(entry)).join('\n');
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${logType}-${new Date().toISOString()}.log`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredEntries = entries.filter((entry) => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      entry.message?.toLowerCase().includes(searchLower) ||
      JSON.stringify(entry).toLowerCase().includes(searchLower)
    );
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-600 bg-red-50';
      case 'WARN':
        return 'text-yellow-600 bg-yellow-50';
      case 'INFO':
        return 'text-blue-600 bg-blue-50';
      case 'DEBUG':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Logs système</h1>
          <p className="text-gray-600">Consultez et gérez les logs de l'application</p>
        </div>

        {/* Message Banner */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">{message.type === 'success' ? '✓' : '✗'}</span>
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Log Type Selector */}
            <div>
              <label htmlFor="logType" className="block text-sm font-medium text-gray-700 mb-1">
                Type de log
              </label>
              <select
                id="logType"
                value={logType}
                onChange={(e) => setLogType(e.target.value as LogType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="app">Application (app.log)</option>
                <option value="actions">Actions utilisateur (actions.log)</option>
                <option value="emails">Emails (emails.log)</option>
                <option value="deploy">Déploiements (deploy.log)</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Rechercher
              </label>
              <input
                type="text"
                id="search"
                placeholder="Filtrer les logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Actions */}
            <div className="flex items-end space-x-2">
              <button
                onClick={loadLogs}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
              >
                {isLoading ? 'Chargement...' : 'Actualiser'}
              </button>
              <button
                onClick={downloadLogs}
                disabled={entries.length === 0}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium transition-colors"
              >
                📥 Télécharger
              </button>
            </div>

            {/* Clear */}
            <div className="flex items-end">
              <button
                onClick={clearLogs}
                disabled={isLoading || entries.length === 0}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium transition-colors"
              >
                🗑️ Effacer le log
              </button>
            </div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Taille du fichier:</span>
                  <span className="ml-2 font-medium text-gray-900">{formatBytes(stats.size)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Nombre de lignes:</span>
                  <span className="ml-2 font-medium text-gray-900">{stats.lines}</span>
                </div>
                <div>
                  <span className="text-gray-600">Dernière modification:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {new Date(stats.lastModified).toLocaleString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Log Entries */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Dernières entrées ({filteredEntries.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredEntries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {isLoading ? 'Chargement des logs...' : 'Aucune entrée de log'}
              </div>
            ) : (
              filteredEntries.reverse().map((entry, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    {/* Timestamp */}
                    <div className="flex-shrink-0 w-40 text-sm text-gray-500 font-mono">
                      {new Date(entry.timestamp).toLocaleString('fr-FR', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                      })}
                    </div>

                    {/* Level Badge */}
                    <div className="flex-shrink-0">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(
                          entry.level
                        )}`}
                      >
                        {entry.level}
                      </span>
                    </div>

                    {/* Message */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 break-words">{entry.message}</p>
                      {Object.keys(entry).filter(
                        (key) => !['timestamp', 'level', 'type', 'message'].includes(key)
                      ).length > 0 && (
                        <details className="mt-2">
                          <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                            Voir les détails
                          </summary>
                          <pre className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-x-auto">
                            {JSON.stringify(
                              Object.fromEntries(
                                Object.entries(entry).filter(
                                  ([key]) => !['timestamp', 'level', 'type', 'message'].includes(key)
                                )
                              ),
                              null,
                              2
                            )}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
