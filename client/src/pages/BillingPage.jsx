const BillingPage = () => (
  <main className="page">
    <header className="page-header">
      <h1>Billing</h1>
      <p>Invoices and payments for clinic visits.</p>
    </header>
    <section className="page-panel">
      <h2>Invoices</h2>
      <p className="empty-state">
        No invoices yet. Billing records will appear here after visits are
        closed.
      </p>
    </section>
  </main>
);

export default BillingPage;
