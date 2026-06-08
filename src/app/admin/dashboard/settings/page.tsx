
'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { db, type Settings } from '@/lib/local-storage-db';
import { Loader2 } from 'lucide-react';

const defaultSettings: Settings = {
  academicSession: '2025-2026',
  admissionDeadline: '2025-08-31',
  obeMode: true,
  universityName: 'Obsidian Peak University',
  universityLogoUrl: '',
  maintenanceMode: false,
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedSettings = db.get('settings');
    if (loadedSettings) {
      setSettings(loadedSettings);
    }
    setIsLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof Settings, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = (formName: string) => {
    db.set('settings', settings);
    toast({
      title: "Settings Saved",
      description: `${formName} have been updated successfully.`,
    });
  };

  if (isLoading) {
    return <div className="flex items-center gap-2"><Loader2 className="animate-spin" /> Loading settings...</div>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline mb-6">
        System Settings
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <form onSubmit={(e) => { e.preventDefault(); handleSave('Academic Settings'); }}>
            <CardHeader>
              <CardTitle>Academic Settings</CardTitle>
              <CardDescription>
                Manage general academic configurations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="academicSession">Current Academic Session</Label>
                <Input name="academicSession" id="academicSession" value={settings.academicSession} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admissionDeadline">Admission Deadline</Label>
                <Input name="admissionDeadline" id="admissionDeadline" type="date" value={settings.admissionDeadline} onChange={handleInputChange} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                     <Label htmlFor="obeMode">Enable Outcome-Based Education (OBE)</Label>
                     <p className="text-xs text-muted-foreground">Activates the OBE module across the platform.</p>
                  </div>
                  <Switch name="obeMode" id="obeMode" checked={settings.obeMode} onCheckedChange={(c) => handleSwitchChange('obeMode', c)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Academic Settings</Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <form onSubmit={(e) => { e.preventDefault(); handleSave('Campus Settings'); }}>
            <CardHeader>
              <CardTitle>Campus Settings</CardTitle>
              <CardDescription>
                Configure general campus information and branding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="universityName">University Name</Label>
                <Input name="universityName" id="universityName" value={settings.universityName} onChange={handleInputChange} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="universityLogoUrl">University Logo URL</Label>
                <Input name="universityLogoUrl" id="universityLogoUrl" type="url" placeholder="https://example.com/logo.png" value={settings.universityLogoUrl} onChange={handleInputChange} />
              </div>
               <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
                    <p className="text-xs text-muted-foreground">Puts the entire student-facing site into maintenance.</p>
                  </div>
                  <Switch name="maintenanceMode" id="maintenanceMode" checked={settings.maintenanceMode} onCheckedChange={(c) => handleSwitchChange('maintenanceMode', c)} />
              </div>
            </CardContent>
             <CardFooter>
              <Button type="submit">Save Campus Settings</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
