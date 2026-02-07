
import React, { useState, useEffect } from 'react';
import { Activity, Shield, Users, Server } from 'lucide-react';

const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        cpu: 12,
        ram: 45,
        disk: 22,
        threatsBlocked: 14502
    });

    // Mock real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() - 0.5) * 10)),
                threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 2)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <header className="mb-10 flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    🛡️ InfraUI Security Command
                </h1>
                <div className="flex gap-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-mono border border-green-500/30">System Normal</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-mono border border-purple-500/30">v2.4.0</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <MetricCard title="CPU Usage" value={`${metrics.cpu.toFixed(1)}%`} icon={<Activity size={24} className="text-cyan-400" />} />
                <MetricCard title="Active Nodes" value="12" icon={<Server size={24} className="text-purple-400" />} />
                <MetricCard title="Threats Blocked" value={metrics.threatsBlocked.toLocaleString()} icon={<Shield size={24} className="text-red-400" />} />
                <MetricCard title="Active Sessions" value="234" icon={<Users size={24} className="text-yellow-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Activity size={20} className="text-cyan-400" />
                        Live Traffic Analysis
                    </h2>
                    <div className="h-64 flex items-end gap-2">
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-cyan-500/50 w-full rounded-t hover:bg-cyan-400 transition-colors"
                                style={{ height: `${20 + Math.random() * 60}%` }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-red-400" />
                        Recent Alerts
                    </h2>
                    <div className="space-y-4">
                        <AlertItem ip="192.168.1.55" type="SSH Brute Force" time="2m ago" />
                        <AlertItem ip="10.0.0.4" type="Port Scan" time="15m ago" />
                        <AlertItem ip="172.16.0.22" type="SQL Injection" time="1h ago" />
                        <AlertItem ip="192.168.1.102" type="Invalid Auth" time="3h ago" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, icon }) => (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className="text-slate-400 text-sm font-medium">{title}</div>
            {icon}
        </div>
        <div className="text-3xl font-bold font-mono">{value}</div>
    </div>
);

const AlertItem = ({ ip, type, time }) => (
    <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
        <div>
            <div className="text-sm font-bold text-red-200">{type}</div>
            <div className="text-xs text-red-300/70 font-mono">{ip}</div>
        </div>
        <div className="text-xs text-slate-400">{time}</div>
    </div>
);

export default Dashboard;
