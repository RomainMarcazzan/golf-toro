-- CreateTable
CREATE TABLE "WeatherData" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "temperatureAvg" DOUBLE PRECISION NOT NULL,
    "temperatureMin" DOUBLE PRECISION NOT NULL,
    "temperatureMax" DOUBLE PRECISION NOT NULL,
    "humidityAvg" DOUBLE PRECISION NOT NULL,
    "humidityMin" DOUBLE PRECISION NOT NULL,
    "humidityMax" DOUBLE PRECISION NOT NULL,
    "radiationAvg" DOUBLE PRECISION NOT NULL,
    "radiationMin" DOUBLE PRECISION NOT NULL,
    "radiationMax" DOUBLE PRECISION NOT NULL,
    "windAvg" DOUBLE PRECISION NOT NULL,
    "windMin" DOUBLE PRECISION NOT NULL,
    "windMax" DOUBLE PRECISION NOT NULL,
    "dewPointAvg" DOUBLE PRECISION NOT NULL,
    "dewPointMin" DOUBLE PRECISION NOT NULL,
    "dewPointMax" DOUBLE PRECISION NOT NULL,
    "precipitation" DOUBLE PRECISION NOT NULL,
    "et" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WeatherData_pkey" PRIMARY KEY ("id")
);
