import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DataGrid } from './components/DataGrid/DataGrid';
import { ArrowDownNarrowWide } from 'lucide-react';
import './index.css';

const queryClient = new QueryClient();

function App() {
  const [limit, setLimit] = useState<number>(10);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-section">
            <h2 className="toolbar-title">Users</h2>
            <span className="toolbar-count">Total: 100+</span>
          </div>

          <div className="toolbar-controls">
            <div className="control-group">
              <ArrowDownNarrowWide size={14} className="control-icon" />
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="toolbar-select"
              >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* content-area fills the rest of the height */}
        <div className="content-area">
          <DataGrid limit={limit} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
