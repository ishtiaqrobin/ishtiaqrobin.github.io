import { contactService } from "@/services/contact.service";

import { ContactManager } from "@/components/modules/dashboard/admin/contact/ContactManager";
import { sessionService } from "@/services/session.service";

export default async function AdminContactsPage() {
  const session = await sessionService.getSession();
  const token = session.data?.session.token;

  const [contactsRes, statsRes] = await Promise.all([
    contactService.getAllContacts(token),
    contactService.getContactStats(token),
  ]);

  return (
    <div className="min-h-screen space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Contacts Management
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage messages from your portfolio visitors
        </p>
      </div>

      <ContactManager
        initialContacts={contactsRes.data ?? []}
        initialStats={statsRes.data ?? []}
        token={token}
      />
    </div>
  );
}
