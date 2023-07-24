**Team:**
1. Chris - Services; Both using peer programming
2. Anaka - Sales; Both using peer programming

For this project we leveraged peer programming to maintain code consistency and to ensure that both of the team members were on the same page. We worked to maintain a consistent style to include the use of functions and abstraction so that changes would be consistently applied across the board.

---

*Architecture:*

The application follows a microservices architecture with distinct backend services for each module and a separate React-based frontend.
The services are containerized using Docker.

*Modules:*

    1. Sales:
        - Manages sales operations.
        - Entities: SalesPerson, Customer, SalesRecord, and Automobile.
        - Provides API endpoints for CRUD operations on sales records and listing available cars.
        - Uses a periodic poller to sync automobile data from the inventory API.

    2. Inventory:
        - Manages automobile details in the dealership's inventory.
        - Entities: Manufacturer, VehicleModel, and Automobile.
        - Offers API endpoints for CRUD operations on individual automobiles, vehicle models, and manufacturers.

    3. Service:
        - Manages service operations for the dealership.
        - Entities: AutoMobileVO, Technician, and ServiceAppointment.
        - Contains API endpoints for managing service appointments and technicians.

    4. GHI:
        - A React-based frontend application.
        - Interacts with the backend services to display and manage information.
        - Likely the user interface for the entire application.



*Databases:*
The application uses PostgreSQL as its primary database management system. Each module has its own dedicated user and database.

    Sales Database:
    - Name: sales
    - Purpose: To store and manage sales-related data.
    - Entities:
        - SalesPerson: Contains details like name and employee number.
        - Customer: Contains details like name, address, and phone number.
        - SalesRecord: Contains details like the price, the associated salesperson, customer, and automobile.
        - AutomobileVO: Represents an automobile with details like VIN, color, year, and model.

    Inventory Database:
    - Name: inventory
    - Purpose: To store and manage details of the dealership's inventory.
    - Entities:
        - Manufacturer: Represents an automobile manufacturer with a name attribute.
        - VehicleModel: Contains details like name, picture URL, and associated manufacturer.
        - Automobile: Represents individual automobiles with attributes like color, year, VIN, and a sold status.

    Service Database:
    - Name: service
    - Purpose: To store and manage service-related data and appointments.
    - Entities:
        - AutoMobileVO: Represents an automobile with details like VIN, color, year, and model.
        - Technician: Contains details like name and employee number.
        - ServiceAppointment: Manages service appointments with details like customer name, date, time, reason for service, and the status of the appointment (completed, VIP, canceled).
