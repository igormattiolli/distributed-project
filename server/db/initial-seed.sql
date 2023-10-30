--Postgresql 15
CREATE DATABASE distributed;
\c distributed;

CREATE TYPE product_status_enum AS ENUM
    ('ordered', 'shipped', 'out_for_delivery', 'delivered');
    
CREATE TABLE product
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    status product_status_enum NOT NULL DEFAULT 'ordered',
    createdat timestamp with time zone NOT NULL DEFAULT now(),
    updatedat timestamp with time zone NOT NULL DEFAULT now(),
    deletedat timestamp with time zone,
    PRIMARY KEY (id)
);