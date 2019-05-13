FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY MyClietsBase/MyClientsBase.csproj MyClietsBase/
COPY Data.EF/Data.EF.csproj Data.EF/
COPY Domain.Interfaces/Domain.Interfaces.csproj Domain.Interfaces/
COPY Data.DTO/Data.DTO.csproj Data.DTO/
COPY Data.Reports/Data.Reports.csproj Data.Reports/
RUN dotnet restore MyClietsBase/MyClientsBase.csproj
COPY . .
WORKDIR /src/MyClietsBase
RUN dotnet build MyClientsBase.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish MyClientsBase.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "MyClientsBase.dll"]
