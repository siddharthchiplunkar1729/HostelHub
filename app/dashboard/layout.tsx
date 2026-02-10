import EnrollmentGate from "@/components/EnrollmentGate";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <EnrollmentGate>{children}</EnrollmentGate>;
}
