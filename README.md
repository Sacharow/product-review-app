# Ogólne wymagania dotyczące zakresu projektu

## Aplikacja Mikroserwisowa

Należy zaimplementować aplikację opartą na architekturze mikroserwisowej, składającą się z co najmniej trzech odrębnych, logicznie uzasadnionych usług (mikroserwisów).  
**Przykładowe komponenty:**
- Usługa frontendowa
- Usługa backendowa (API)
- Usługa dedykowana (np. obsługa logiki biznesowej)
- Baza danych (SQL/NoSQL)
- Pamięć podręczna (np. Redis)
- System kolejkowy (np. RabbitMQ)

Technologie implementacji są dowolne. Należy zadbać o poprawną komunikację między serwisami (np. REST, gRPC, komunikacja przez kolejkę).

---

## Etap I: Wdrożenie z użyciem Docker Compose (50% oceny końcowej)

**Cel etapu:**  
Skonfigurowanie i uruchomienie całej aplikacji mikroserwisowej lokalnie przy użyciu Docker Compose, z naciskiem na dobre praktyki konteneryzacji.

- **Maksymalna liczba punktów bazowych:** 50 pkt.
- **Minimalny próg zaliczenia Etapu I:** 25 pkt.

### Wymagane elementy i punktacja

- **Jakość Architektury (8 pkt):**  
  Ocenie podlega logiczny podział na mikroserwisy, spójność i poprawność zaimplementowanej komunikacji między nimi.

- **Definicja Usług (`docker-compose.yml`) (14 pkt):**  
  - Wymagana jest poprawna składnia pliku `docker-compose.yml`.
  - Należy zdefiniować wszystkie usługi aplikacji oraz zależności (`depends_on`).
  - Wymagane jest efektywne zarządzanie konfiguracją (np. zmienne środowiskowe).

- **Sieci Docker (6 pkt):**  
  - Należy utworzyć i wykorzystać niestandardową sieć Docker.
  - Wymagana jest poprawna konfiguracja komunikacji przez nazwy kontenerów.

- **Wolumeny Docker (6 pkt):**  
  - Należy skonfigurować wolumeny dla usług stanowych w celu zapewnienia trwałości danych.

- **Optymalizacja Obrazów Docker (`Dockerfile`) (11 pkt):**  
  - Należy przygotować własne, poprawne pliki `Dockerfile`.
  - Wymagane jest zastosowanie technik minimalizacji rozmiaru obrazu (multi-stage builds, itp.).
  - Ocenie podlega efektywne wykorzystanie cache'u warstw oraz użycie `.dockerignore`.

- **Multiplatformowość (5 pkt):**  
  - Należy zbudować obrazy wieloarchitekturowe (`amd64`, `arm64`) przy użyciu `docker buildx` lub podobnego mechanizmu.

#### Zagadnienia Dodatkowe (Etap I - Maksymalnie 10 punktów ekstra):

- Implementacja dyrektyw `healthcheck` w pliku `docker-compose.yml`. **(+4 pkt)**
- Wykorzystanie argumentów budowania (`ARG`) i zmiennych (`ENV`) w `Dockerfile` do parametryzacji. **(+1 pkt)**
- Zastosowanie Docker Secrets do zarządzania danymi wrażliwymi. **(+3 pkt)**
- Implementacja mechanizmu "live reload"/"hot reload" dla usług deweloperskich. **(+2 pkt)**

---

## Etap II: Migracja do Kubernetes (50% oceny końcowej)

**Cel etapu:**  
Przeniesienie tej samej aplikacji mikroserwisowej do środowiska Kubernetes, konfiguracja zasobów oraz zapewnienie skalowalności i dostępności.

- **Maksymalna liczba punktów bazowych:** 50 pkt.
- **Minimalny próg zaliczenia Etapu II:** 25 pkt.

### Wymagane elementy i punktacja

- **Manifesty Zasobów Kubernetes (Deployment, Service, ConfigMap, Secret) (19 pkt):**  
  - Należy przygotować poprawne manifesty YAML.
  - Wymagana jest poprawna konfiguracja selektorów, etykiet, portów.
  - Ocenie podlega bezpieczne zarządzanie sekretami i konfiguracją.

- **Trwałe Przechowywanie Danych (PV/PVC) (9 pkt):**  
  - Wymagana jest poprawna definicja `PersistentVolumeClaim`.
  - Należy użyć `StorageClass` (jeśli dostępne) lub zdefiniować `PersistentVolume`.
  - Ocenie podlega poprawne podmontowanie wolumenów w Podach.

- **Ruch Zewnętrzny (Ingress / LoadBalancer) (9 pkt):**  
  - Należy skonfigurować dostęp do aplikacji z zewnątrz za pomocą `Ingress` lub `Service` typu `LoadBalancer`.
  - Wymagana jest poprawna konfiguracja reguł routingu lub ekspozycji portów.

- **Skalowanie Aplikacji (Replicas + HPA) (13 pkt):**  
  - Należy ustawić odpowiednią liczbę replik (`replicas`) w `Deployment`.
  - Wymagane jest skonfigurowanie działającego `HorizontalPodAutoscaler (HPA)` dla co najmniej jednej usługi (wymaga Metrics Server).

#### Zagadnienia Dodatkowe (Etap II - Maksymalnie 10 punktów ekstra):

- **Monitoring:** Wdrożenie Prometheus + Grafana, konfiguracja ServiceMonitor/adnotacji, stworzenie prostego dashboardu. **(+4 pkt)**
- **Helm:** Spakowanie aplikacji jako Helm Chart. **(+3 pkt)**
- **CI/CD:** Zaimplementowanie prostego potoku CI/CD (np. GitHub Actions) do automatycznego budowania obrazów i pushowania do repozytorium kontenerów. **(+3 pkt)**

---

## Kryteria Oceny Ogólnej

- **Funkcjonalność:** Ocenie podlega poprawne działanie aplikacji w obu środowiskach.
- **Kompletność:** Ocenie podlega zrealizowanie wszystkich wymaganych elementów bazowych.
- **Jakość Kodu i Konfiguracji:** Ocenie podlega poprawność i zgodność z dobrymi praktykami plików Dockerfile, docker-compose.yml, manifestów Kubernetes.
- **Zaliczenie Etapów:** Warunkiem zaliczenia jest uzyskanie minimum 25 punktów bazowych z Etapu I ORAZ minimum 25 punktów bazowych z Etapu II.
- **Ocena Końcowa:** Ocena końcowa jest średnią arytmetyczną procentowego wyniku punktowego (punkty bazowe + dodatkowe, maks. 60 pkt na etap) z obu etapów.
