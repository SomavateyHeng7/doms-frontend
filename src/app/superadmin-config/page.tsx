'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Wrench, Building2, GitBranch, Bell, Crown, UserCheck,
  Briefcase, ChevronRight, Save, AlertTriangle, CheckCircle,
  Clock, Settings,
} from 'lucide-react';
import { useSuperAdmin } from '@/contexts/SuperAdminContext';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/shared/PageHeader';

type Tab = 'maintenance' | 'organization' | 'approvalFlow' | 'notifications';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'approvalFlow', label: 'Approval Flow', icon: GitBranch },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const HIERARCHY = [
  {
    label: 'Superadmin',
    sub: 'Full system access · Technical overseer',
    icon: Crown,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    label: 'Admin / Boss Head',
    sub: 'Manages users & approves documents · Organization leader',
    icon: Building2,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    label: 'Officer / Manager',
    sub: 'Reviews and processes document requests · Mid-level',
    icon: UserCheck,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  {
    label: 'Broker / Employee',
    sub: 'Submits documents for approval · Field worker',
    icon: Briefcase,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
          ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}

function CheckRow({
  id,
  label,
  desc,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
      />
      <div>
        <label htmlFor={id} className="text-sm font-medium text-gray-900 cursor-pointer">
          {label}
        </label>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function SaveButton({ saved, onClick }: { saved: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors
        ${saved ? 'bg-green-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
    >
      {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
      {saved ? 'Saved!' : 'Save Changes'}
    </button>
  );
}

export default function SuperAdminConfigPage() {
  const {
    isSuperAdmin, config,
    updateMaintenance, updateOrganization, updateApprovalFlow, updateNotifications,
    toggleMaintenance,
  } = useSuperAdmin();
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>('maintenance');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isSuperAdmin)) {
      router.replace('/admin/dashboard');
    }
  }, [loading, isAuthenticated, isSuperAdmin, router]);

  if (loading || !isSuperAdmin) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    );
  }

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader title="System Configuration" />

      <main className="flex-1 p-4 sm:p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-5">

          {/* Superadmin badge */}
          <div className="flex items-center gap-2.5 bg-purple-50 border border-purple-200 rounded-xl px-4 py-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Crown className="w-4 h-4 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-purple-900">Superadmin Configuration Panel</p>
              <p className="text-xs text-purple-600 truncate">
                Changes are applied immediately and persisted for all sessions
              </p>
            </div>
            <Settings className="w-4 h-4 text-purple-400 ml-auto flex-shrink-0" />
          </div>

          {/* Tab panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px flex-1 justify-center whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-purple-600 text-purple-700 bg-purple-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <tab.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-6 space-y-6">

              {/* ── MAINTENANCE ─────────────────────────────── */}
              {activeTab === 'maintenance' && (
                <>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Maintenance Mode</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      When enabled, all users except superadmin are shown the maintenance page.
                    </p>
                  </div>

                  {/* Big toggle card */}
                  <div
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors
                      ${config.maintenance.enabled
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-gray-200 bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                          ${config.maintenance.enabled ? 'bg-amber-100' : 'bg-gray-200'}`}
                      >
                        <Wrench
                          className={`w-5 h-5 transition-colors
                            ${config.maintenance.enabled ? 'text-amber-600' : 'text-gray-500'}`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Maintenance Mode</p>
                        <p
                          className={`text-xs font-semibold
                            ${config.maintenance.enabled ? 'text-amber-600' : 'text-gray-400'}`}
                        >
                          {config.maintenance.enabled ? 'ACTIVE' : 'Disabled'}
                        </p>
                      </div>
                    </div>
                    <Toggle
                      checked={config.maintenance.enabled}
                      onChange={toggleMaintenance}
                    />
                  </div>

                  {/* Warning banner */}
                  {config.maintenance.enabled && (
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-amber-800">System is in maintenance</p>
                        <p className="text-sm text-amber-700 mt-0.5 leading-relaxed">
                          Admin, Officer, and Broker users are currently redirected to the maintenance page.
                          Only Superadmin accounts can access the system right now.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Maintenance Message
                    </label>
                    <textarea
                      value={config.maintenance.message}
                      onChange={e => updateMaintenance({ message: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Message displayed to users during maintenance..."
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      This message is shown on the maintenance page to all non-superadmin users.
                    </p>
                  </div>

                  {/* Estimated end time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Estimated End Time{' '}
                      <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input
                        type="datetime-local"
                        value={config.maintenance.estimatedEndTime}
                        onChange={e => updateMaintenance({ estimatedEndTime: e.target.value })}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Displayed on the maintenance page so users know when to return.
                    </p>
                  </div>
                </>
              )}

              {/* ── ORGANIZATION ─────────────────────────────── */}
              {activeTab === 'organization' && (
                <>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Organization Settings</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Configure your organization structure, hierarchy awareness, and boss-level controls.
                    </p>
                  </div>

                  {/* Org name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={config.organization.name}
                      onChange={e => updateOrganization({ name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Hierarchy tree */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Role Hierarchy</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-1">
                      {HIERARCHY.map((level, i) => (
                        <div key={level.label}>
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg bg-white border ${level.border}`}
                          >
                            <div
                              className={`w-9 h-9 ${level.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                            >
                              <level.icon className={`w-5 h-5 ${level.color}`} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900">{level.label}</p>
                              <p className="text-xs text-gray-500 truncate">{level.sub}</p>
                            </div>
                            <span
                              className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${level.bg} ${level.color} flex-shrink-0`}
                            >
                              Level {i + 1}
                            </span>
                          </div>
                          {i < HIERARCHY.length - 1 && (
                            <div className="flex justify-center py-0.5">
                              <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      The hierarchy is enforced by the system. Permissions flow strictly downward.
                    </p>
                  </div>

                  {/* Boss awareness */}
                  <div className="space-y-2.5">
                    <p className="text-sm font-medium text-gray-700">Boss / Head Awareness</p>
                    <CheckRow
                      id="requireBossApprovalForAll"
                      label="Require boss approval for all documents"
                      desc="All documents must pass through the Admin/Boss level regardless of their pipeline configuration."
                      checked={config.organization.requireBossApprovalForAll}
                      onChange={v => updateOrganization({ requireBossApprovalForAll: v })}
                    />
                    <CheckRow
                      id="notifyHeadOnSubmission"
                      label="Notify head on document submission"
                      desc="The Admin/Boss receives a notification whenever a document is submitted for approval."
                      checked={config.organization.notifyHeadOnSubmission}
                      onChange={v => updateOrganization({ notifyHeadOnSubmission: v })}
                    />
                    <CheckRow
                      id="notifyHeadOnApproval"
                      label="Notify head on document approval"
                      desc="The Admin/Boss is notified when any document is approved, keeping the head always in the loop."
                      checked={config.organization.notifyHeadOnApproval}
                      onChange={v => updateOrganization({ notifyHeadOnApproval: v })}
                    />
                    <CheckRow
                      id="notifyHeadOnRejection"
                      label="Notify head on document rejection"
                      desc="The Admin/Boss is alerted whenever a document is rejected so corrective action can be taken."
                      checked={config.organization.notifyHeadOnRejection}
                      onChange={v => updateOrganization({ notifyHeadOnRejection: v })}
                    />
                  </div>

                  {/* Auto escalate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Auto-escalate after (days)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={config.organization.autoEscalateDays}
                        onChange={e =>
                          updateOrganization({ autoEscalateDays: parseInt(e.target.value) || 1 })
                        }
                        className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                      />
                      <span className="text-sm text-gray-500">
                        days without action before automatically escalating to the boss/head
                      </span>
                    </div>
                  </div>

                  <SaveButton saved={saved} onClick={showSaved} />
                </>
              )}

              {/* ── APPROVAL FLOW ─────────────────────────────── */}
              {activeTab === 'approvalFlow' && (
                <>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Approval Flow</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Control how documents move through the approval pipeline and who has sign-off authority.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <CheckRow
                      id="requireAllApprovers"
                      label="Require all approvers to sign off"
                      desc="All assigned approvers must approve before a document is marked as approved. If disabled, any single approver can finalize the decision."
                      checked={config.approvalFlow.requireAllApprovers}
                      onChange={v => updateApprovalFlow({ requireAllApprovers: v })}
                    />
                    <CheckRow
                      id="allowSelfApproval"
                      label="Allow self-approval"
                      desc="Document submitters can approve their own documents. Not recommended for compliance-sensitive environments."
                      checked={config.approvalFlow.allowSelfApproval}
                      onChange={v => updateApprovalFlow({ allowSelfApproval: v })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Maximum approval levels
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={config.approvalFlow.maxLevels}
                        onChange={e =>
                          updateApprovalFlow({ maxLevels: parseInt(e.target.value) || 1 })
                        }
                        className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                      />
                      <span className="text-sm text-gray-500">
                        maximum steps allowed in any approval pipeline
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Pipelines with more steps than this limit will not be allowed during creation.
                    </p>
                  </div>

                  {/* Visual summary */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                    <p className="text-sm font-semibold text-blue-800">Current flow summary</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>
                        • Approval mode:{' '}
                        <strong>{config.approvalFlow.requireAllApprovers ? 'All approvers required' : 'Any approver sufficient'}</strong>
                      </li>
                      <li>
                        • Self-approval:{' '}
                        <strong>{config.approvalFlow.allowSelfApproval ? 'Allowed' : 'Not allowed'}</strong>
                      </li>
                      <li>
                        • Max pipeline depth: <strong>{config.approvalFlow.maxLevels} levels</strong>
                      </li>
                    </ul>
                  </div>

                  <SaveButton saved={saved} onClick={showSaved} />
                </>
              )}

              {/* ── NOTIFICATIONS ─────────────────────────────── */}
              {activeTab === 'notifications' && (
                <>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Notification Settings</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Control how and when users and administrators receive notifications across the system.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-sm font-medium text-gray-700">Delivery Channels</p>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email notifications</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Send email alerts to users for all configured events.
                        </p>
                      </div>
                      <Toggle
                        checked={config.notifications.emailEnabled}
                        onChange={() =>
                          updateNotifications({ emailEnabled: !config.notifications.emailEnabled })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
                      <div>
                        <p className="text-sm font-medium text-gray-900">In-app notifications</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Show notification badges and alerts inside the application.
                        </p>
                      </div>
                      <Toggle
                        checked={config.notifications.inAppEnabled}
                        onChange={() =>
                          updateNotifications({ inAppEnabled: !config.notifications.inAppEnabled })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-sm font-medium text-gray-700">Notify On</p>
                    <CheckRow
                      id="notifyOnDocumentSubmit"
                      label="Document submitted"
                      desc="Notify assigned approvers when a new document is submitted for review."
                      checked={config.notifications.notifyOnDocumentSubmit}
                      onChange={v => updateNotifications({ notifyOnDocumentSubmit: v })}
                    />
                    <CheckRow
                      id="notifyOnDocumentApprove"
                      label="Document approved"
                      desc="Notify the requester and admin when a document completes the approval process."
                      checked={config.notifications.notifyOnDocumentApprove}
                      onChange={v => updateNotifications({ notifyOnDocumentApprove: v })}
                    />
                    <CheckRow
                      id="notifyOnDocumentReject"
                      label="Document rejected"
                      desc="Notify the requester and admin when a document is rejected so it can be revised."
                      checked={config.notifications.notifyOnDocumentReject}
                      onChange={v => updateNotifications({ notifyOnDocumentReject: v })}
                    />
                  </div>

                  <SaveButton saved={saved} onClick={showSaved} />
                </>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
