
'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { db, type Role, type Permission, type RolePermissions } from '@/lib/local-storage-db';
import { useToast } from '@/hooks/use-toast';

function PermissionSwitch({ roleName, permissionId, isChecked, onPermissionChange }: { roleName: string, permissionId: string, isChecked: boolean, onPermissionChange: (roleName: string, permissionId: string, isChecked: boolean) => void; }) {
    return (
        <Switch 
            checked={isChecked}
            onCheckedChange={(checked) => onPermissionChange(roleName, permissionId, checked)}
            aria-label={`${roleName} ${permissionId}`}
        />
    )
}

export default function UsersPage() {
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermissions>({});

  const loadData = () => {
    setRoles(db.getAll('roles'));
    setPermissions(db.getAll('permissions'));
    setRolePermissions(db.get('rolePermissions') || {});
  }

  useEffect(() => {
    loadData();
    const handleDbChange = (event: any) => {
        if(event.detail.table === 'roles' || event.detail.table === 'permissions' || event.detail.table === 'rolePermissions') {
            loadData();
        }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);

  const handlePermissionChange = (roleName: string, permissionId: string, isChecked: boolean) => {
    const updatedPermissions = { ...rolePermissions };
    if (!updatedPermissions[roleName]) {
        updatedPermissions[roleName] = [];
    }

    if (isChecked) {
        if (!updatedPermissions[roleName].includes(permissionId)) {
            updatedPermissions[roleName].push(permissionId);
        }
    } else {
        updatedPermissions[roleName] = updatedPermissions[roleName].filter(p => p !== permissionId);
    }
    
    db.set('rolePermissions', updatedPermissions);
    toast({ title: "Permissions Updated", description: `Permission ${isChecked ? 'granted' : 'revoked'} for ${roleName}.` });
  };


  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Data/Users (Access Control)
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Role-Based Access Control (RBAC)</CardTitle>
          <CardDescription>
            Manage user permissions for different roles within the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  {permissions.map(p => <TableHead key={p.id}>{p.label}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.name}>
                    <TableCell className="font-medium">
                      <p>{role.name}</p>
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                    </TableCell>
                    {permissions.map(p => (
                      <TableCell key={p.id}>
                          <PermissionSwitch
                            roleName={role.name}
                            permissionId={p.id}
                            isChecked={rolePermissions[role.name]?.includes(p.id)}
                            onPermissionChange={handlePermissionChange}
                          />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </>
  );
}
