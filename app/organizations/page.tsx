"use client";

import type React from "react";
import { useState, useEffect } from "react";
// CHANGED: Imported addMemberToOrganization
import {
  getOrganizations,
  createOrganization,
  addMemberToOrganization,
} from "../../src/api/organizations";
import { Button } from "../../src/components/Button";
import { Modal } from "../../src/components/Modal";
import { Input } from "../../src/components/Input";
// CHANGED: Imported Select for the role dropdown
import { Select } from "../../src/components/Select";
import { useToast } from "../../hooks/use-toast";
import { UserPlus } from "lucide-react"; // Optional icon

type UniversalOrg = {
  id: string;
  name: string;
  description?: string;
  role?: string;
  organization?: any;
  org?: any;
  [key: string]: any;
};

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<UniversalOrg[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for Create Org Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // State for Add Member Modal
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [targetOrgId, setTargetOrgId] = useState<string | null>(null);

  const [activeOrgId, setActiveOrgId] = useState("");
  const { toast } = useToast();

  // Form Data for Create Org
  const [createFormData, setCreateFormData] = useState({
    name: "",
    description: "",
  });

  // Form Data for Add Member
  const [memberFormData, setMemberFormData] = useState({
    userId: "",
    role: "USER",
  });

  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      const data = await getOrganizations();
      const list = Array.isArray(data)
        ? data.map((item: any) => {
            const orgObj = item.organization || item.org || item;
            return {
              id: orgObj.id || item.id,
              name: orgObj.name || item.name || "Unknown Name",
              description: orgObj.description || item.description,
              role: item.role || item.memberRole || orgObj.role,
            };
          })
        : [];

      setOrganizations(list);
      const storedOrgId = localStorage.getItem("currentOrgId");
      if (storedOrgId) setActiveOrgId(storedOrgId);
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
      setOrganizations([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Handle Create Organization
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrganization({
        name: createFormData.name,
        description: createFormData.description || undefined,
      });
      await fetchOrganizations();
      setIsCreateModalOpen(false);
      setCreateFormData({ name: "", description: "" });
      toast({ title: "Department created" });
    } catch (error) {
      console.error("Failed to create organization:", error);
      toast({ title: "Error creating department" });
    }
  };

  // Handle Add Member
  const handleAddMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetOrgId) return;

    try {
      await addMemberToOrganization(
        targetOrgId,
        memberFormData.userId,
        memberFormData.role
      );
      setIsAddMemberModalOpen(false);
      setMemberFormData({ userId: "", role: "USER" }); // Reset form
      toast({ title: "Member added successfully" });
    } catch (error) {
      console.error("Failed to add member:", error);
      toast({
        title: "Failed to add member",
        description: "Check if the User ID exists.",
      });
    }
  };

  const openAddMemberModal = (orgId: string) => {
    setTargetOrgId(orgId);
    setIsAddMemberModalOpen(true);
  };

  const handleSetActive = async (orgId: string) => {
    setActiveOrgId(orgId);
    localStorage.setItem("currentOrgId", orgId);
    document.cookie = `currentOrgId=${orgId}; path=/; SameSite=Lax`;
    window.location.reload();
  };

  if (isLoading) return <div className="p-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Departments
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Switch between departments or manage members.
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {organizations.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No departments found
          </div>
        ) : (
          organizations.map((org, index) => (
            <div
              key={`${org.id}-${index}`}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900">
                    {org.name}
                  </h3>
                  {activeOrgId === String(org.id) && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      Active
                    </span>
                  )}
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  ID:{" "}
                  <span className="font-mono bg-gray-100 p-1">{org.id}</span>
                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {org.description || "No description"}
                </p>

                {org.role && (
                  <p className="text-xs text-gray-500 mt-2 border-t pt-2 uppercase font-semibold">
                    Role: {org.role}
                  </p>
                )}
              </div>

              <div className="space-y-2 mt-auto">
                {activeOrgId !== String(org.id) ? (
                  <Button
                    variant="secondary"
                    onClick={() => handleSetActive(String(org.id))}
                    className="w-full"
                  >
                    Switch to This Department
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className="w-full border-blue-200 bg-blue-50 text-blue-700 pointer-events-none"
                  >
                    Currently Active
                  </Button>
                )}

                {/* Add Member Button */}
                <Button
                  variant="secondary"
                  onClick={() => openAddMemberModal(String(org.id))}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" /> Add Member
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE ORG MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Department"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-5">
          <Input
            label="Department Name"
            value={createFormData.name}
            onChange={(e) =>
              setCreateFormData({ ...createFormData, name: e.target.value })
            }
            placeholder="Enter department name"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={createFormData.description}
              onChange={(e) =>
                setCreateFormData({
                  ...createFormData,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
              placeholder="Add a description for this department"
              rows={4}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-md shadow-primary/20"
            >
              Create Department
            </Button>
          </div>
        </form>
      </Modal>

      {/* ADD MEMBER MODAL */}
      <Modal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        title="Add Member to Department"
      >
        <form onSubmit={handleAddMemberSubmit} className="space-y-4">
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-xs mb-2">
            Adding user to Department ID: <strong>{targetOrgId}</strong>
          </div>
          <Input
            label="User ID"
            value={memberFormData.userId}
            onChange={(e) =>
              setMemberFormData({ ...memberFormData, userId: e.target.value })
            }
            placeholder="e.g. 101"
            required
          />
          <Select
            label="Role"
            value={memberFormData.role}
            onChange={(e) =>
              setMemberFormData({ ...memberFormData, role: e.target.value })
            }
            options={[
              { value: "USER", label: "User" },
              { value: "ADMIN", label: "Admin" },
              { value: "MANAGER", label: "Manager" },
            ]}
          />
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddMemberModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Member
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
