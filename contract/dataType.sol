  enum InvoiceStatus {
        Pending,
        Canceled,
        Completed
    }

    struct invoice {
        bytes id;
        uint32 amount;
        address from;
        address to;
        InvoiceStatus status;
    }