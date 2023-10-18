Bigger Industrialisation
========================

Bigger Industrialisation is a 1.20.1 tech modpack based around Big Globe and GTCEu Modern.

Installation
------------

BI (alas) uses Packwiz currently (and permanently, for development).

1. Download the `Packwiz installer bootstrap <https://github.com/packwiz/packwiz-installer-bootstrap>`_
   and copy it to a Prism Launcher's instance root.
2. Clone the modpack repository somewhere, and run ``packwiz serve -p <port>`` in the root 
   directory.
3. Build the KubeJS files with ``yarn run build-dev``.
4. Add a pre-run command in Prism: 
   ``"$INST_JAVA" -jar packwiz-installer-bootstrap.jar http://127.0.0.1:3045/pack.toml``
5. Boot up the game. The packwiz server will automatically distribute the compiled pack.

Development
-----------

BI uses a bundler setup for the KubeJS scripts. Use ``build-dev`` to build a non-minified version
of the scripts for easier debugging.

Due to stupid KJS bugs, the only babel transpilations available are classes and numeric separators.
Everything else is unavailable as Babel emits ``var``s which have broken and uncompliant scoping
in Rhino (allegedly, by design. Fucking wonderful.)