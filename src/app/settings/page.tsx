import { Settings as SettingsIcon, User, Moon, LogOut } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logoutUser } from "../actions";

export default async function Settings() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <SettingsIcon size={28} color="#ff0033" />
        Settings
      </h1>

      <div className="glass-card mb-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <User size={24} /> Account Profile
        </h2>
        <div className="flex flex-col gap-4 max-w-md">
          <div className="flex-col">
            <label className="text-sm text-secondary mb-1">Full Name</label>
            <input type="text" className="form-input" disabled value={user?.name || ''} />
          </div>
          <div className="flex-col">
            <label className="text-sm text-secondary mb-1">Email Address</label>
            <input type="text" className="form-input" disabled value={user?.email || ''} />
          </div>
        </div>
      </div>

      <div className="glass-card mb-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Moon size={24} /> App Preferences
        </h2>
        <div className="flex items-center justify-between max-w-md">
          <div>
            <div className="font-bold">Cinematic Dark Mode</div>
            <div className="text-secondary text-sm">Ignis is permanently locked to dark mode to ensure maximum aesthetic appeal.</div>
          </div>
          <div style={{ width: 48, height: 24, background: '#ff0033', borderRadius: 12, position: 'relative', cursor: 'not-allowed' }}>
            <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: 2 }}></div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <LogOut size={24} color="#ff0033" /> Sessions & Security
        </h2>
        <div className="flex items-center justify-between max-w-md">
          <div>
            <div className="font-bold">Sign Out of Account</div>
            <div className="text-secondary text-sm">Securely log out of this session on this browser.</div>
          </div>
          <form action={logoutUser}>
            <button type="submit" className="btn-primary" style={{ background: '#ff0033', height: '40px', padding: '0 24px', borderRadius: '8px' }}>
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
